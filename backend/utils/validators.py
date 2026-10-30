"""Small dependency-free input validation helpers."""

import re

from bson import ObjectId
from bson.errors import InvalidId

EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$")


class ValidationError(Exception):
    def __init__(self, message):
        super().__init__(message)
        self.message = message


def require(payload, fields):
    if not isinstance(payload, dict):
        raise ValidationError("Request body must be a JSON object")
    missing = [f for f in fields if payload.get(f) in (None, "", [], {})]
    if missing:
        raise ValidationError(f"Missing required field(s): {', '.join(missing)}")
    return payload


def valid_email(email):
    if not isinstance(email, str) or not EMAIL_RE.match(email.strip()):
        raise ValidationError("Invalid email address")
    return email.strip().lower()


def valid_password(password):
    if not isinstance(password, str) or len(password) < 8:
        raise ValidationError("Password must be at least 8 characters")
    if len(password) > 128:
        raise ValidationError("Password must be less than 128 characters")
    return password


def clean_str(value, field="value", max_len=255, allow_empty=False):
    if value is None and allow_empty:
        return ""
    if not isinstance(value, str):
        raise ValidationError(f"{field} must be a string")
    value = value.strip()
    if not value and not allow_empty:
        raise ValidationError(f"{field} cannot be empty")
    if len(value) > max_len:
        raise ValidationError(f"{field} must be less than {max_len} characters")
    return value


def to_object_id(value, field="id"):
    try:
        return ObjectId(value)
    except (InvalidId, TypeError):
        raise ValidationError(f"Invalid {field}")


def clamp_int(value, low, high, default=None):
    try:
        return max(low, min(high, int(value)))
    except (TypeError, ValueError):
        if default is None:
            raise ValidationError("Expected a number")
        return default
