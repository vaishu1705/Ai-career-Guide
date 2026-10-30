"""Uniform JSON envelope: {success, message, data}."""

from datetime import date, datetime

from bson import ObjectId
from flask import jsonify


def serialize(value):
    """Recursively convert Mongo/BSON types into JSON-safe values."""
    if isinstance(value, ObjectId):
        return str(value)
    if isinstance(value, (datetime, date)):
        return value.isoformat()
    if isinstance(value, list):
        return [serialize(v) for v in value]
    if isinstance(value, dict):
        return {k: serialize(v) for k, v in value.items()}
    return value


def success(data=None, message="OK", status=200):
    return jsonify({"success": True, "message": message, "data": serialize(data) if data is not None else {}}), status


def error(message="Something went wrong", status=400, data=None):
    return jsonify({"success": False, "message": message, "data": serialize(data) if data is not None else {}}), status
