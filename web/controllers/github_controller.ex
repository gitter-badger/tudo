defmodule Tudo.GithubController do
  use Tudo.Web, :controller
  use HTTPoison.Base

  alias Tudo.GithubController
  alias Poison.Parser

  @access_token System.get_env "GITHUB_ACCESS_TOKEN"

  def process_url(url) do
    "https://api.github.com" <> url <> "&access_token=" <> @access_token <> "&per_page=100"
  end

  def index(conn, _) do
    get_repos([], 1)
    # |> get_issues
    conn
  end

  def get_repos(repos, page_number) do
    {:ok, res} = GithubController.get("/orgs/dwyl/repos?page=" <>  Integer.to_string(page_number))
    res
    |> parse_json
    |> fn ({:ok, body}) -> repos ++ body end.()
    |> check_pages(page_number)
  end

  defp check_pages(repos, page_number) do
   case rem(length(repos), 100) do
      0 -> get_repos(repos, (page_number + 1))
      _ -> repos
   end

  end

  defp get_issues({:ok, repos}) do
    Enum.map(repos, fn(repo) -> IO.puts repo["name"] end)
  end

  defp parse_json(res) do
    {:ok, Parser.parse!(res.body)}
  end

end
