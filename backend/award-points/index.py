"""Начислить баллы команде (только для кураторов с паролем)."""
import json
import os
import psycopg2


CURATOR_PASSWORD = os.environ.get("CURATOR_PASSWORD", "")


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    password = body.get("password", "")
    team_id = body.get("team_id")
    task_id = body.get("task_id")
    task_title = body.get("task_title", "")
    points = body.get("points")
    awarded_by = body.get("awarded_by", "куратор")
    note = body.get("note", "")

    if not CURATOR_PASSWORD or password != CURATOR_PASSWORD:
        return {
            "statusCode": 403,
            "headers": headers,
            "body": json.dumps({"error": "Неверный пароль"}, ensure_ascii=False),
        }

    if not all([team_id, task_id, points is not None]):
        return {
            "statusCode": 400,
            "headers": headers,
            "body": json.dumps({"error": "Не все поля заполнены"}, ensure_ascii=False),
        }

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO scores (team_id, task_id, task_title, points, awarded_by, note) VALUES (%s, %s, %s, %s, %s, %s)",
        (team_id, task_id, task_title, points, awarded_by, note)
    )
    conn.commit()
    cur.close()
    conn.close()

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"ok": True, "message": f"Начислено {points} баллов"}, ensure_ascii=False),
    }