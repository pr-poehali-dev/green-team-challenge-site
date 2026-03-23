"""Получить таблицу лидеров с суммой баллов по командам."""
import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute("""
        SELECT t.id, t.name, t.avatar,
               COALESCE(SUM(s.points), 0) AS total_score,
               COUNT(DISTINCT s.task_id) AS completed_tasks
        FROM teams t
        LEFT JOIN scores s ON s.team_id = t.id
        GROUP BY t.id, t.name, t.avatar
        ORDER BY total_score DESC
    """)
    rows = cur.fetchall()
    cur.close()
    conn.close()

    result = []
    for rank, row in enumerate(rows, 1):
        result.append({
            "rank": rank,
            "id": row[0],
            "team": row[1],
            "avatar": row[2],
            "score": int(row[3]),
            "completed": int(row[4]),
        })

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"leaderboard": result}, ensure_ascii=False),
    }