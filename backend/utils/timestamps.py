from datetime import datetime, timezone


def now():
    return datetime.now(timezone.utc)


def with_created(doc, user_id=None):
    ts = now()
    base = {"created_at": ts, "updated_at": ts}
    if user_id is not None:
        base["user_id"] = user_id
    base.update(doc)
    return base


def touch(doc):
    doc = dict(doc)
    doc["updated_at"] = now()
    return doc
