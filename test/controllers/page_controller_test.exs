defmodule Tudo.PageControllerTest do
  use Tudo.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "Help Wanted"
  end
end
