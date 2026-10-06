# Visual color coding test for Python

PRIME = 0x01000193


class Test:
  _name = "test"

  def __init__(self, age = 1_234) -> None:
    self._age = age


def f() -> dict:
  return {
    "a": 1.1,
    "b": "abc",
    "c": True,
    "d": None,
    "e": None,
    "f": lambda: None,
    "g": Test(1),
    "h": [1, 2, 3],
    "i": {"a": 1, "b": 2, "c": 3},
  }


if __name__ == "__main__":
  print(f())
