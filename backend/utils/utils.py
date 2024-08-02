from datetime import datetime

def iso8601_to_iso9075(iso8601_str: str) -> str:
    """
    Convert a date string from ISO 8601 format to ISO 9075 format.

    Args:
        iso8601_str (str): The date string in ISO 8601 format.

    Returns:
        str: The date string in ISO 9075 format.
    """
    # Parse the ISO 8601 date string to a datetime object
    dt = datetime.fromisoformat(iso8601_str)
    # Format the datetime object to ISO 9075 format (SQL-compatible)
    iso9075_str = dt.strftime('%Y-%m-%d %H:%M:%S')
    return iso9075_str