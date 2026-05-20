# Simple static file server for portfolio.html
param([int]$Port = 3000)

$rootPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()

Write-Output "Serving at http://localhost:$Port"
Write-Output "Press Ctrl+C to stop."

$mimeTypes = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css"
  ".js"   = "application/javascript"
  ".json" = "application/json"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".svg"  = "image/svg+xml"
  ".ico"  = "image/x-icon"
}

try {
  while ($listener.IsListening) {
    $context  = $listener.GetContext()
    $request  = $context.Request
    $response = $context.Response

    $localPath = $request.Url.LocalPath
    if ($localPath -eq "/" -or $localPath -eq "") { $localPath = "/index.html" }

    $filePath = Join-Path $rootPath ($localPath.TrimStart('/').Replace('/', '\'))

    if (Test-Path $filePath -PathType Leaf) {
      $ext     = [System.IO.Path]::GetExtension($filePath).ToLower()
      $mime    = if ($mimeTypes[$ext]) { $mimeTypes[$ext] } else { "application/octet-stream" }
      $content = [System.IO.File]::ReadAllBytes($filePath)
      $response.StatusCode      = 200
      $response.ContentType     = $mime
      $response.ContentLength64 = $content.Length
      $response.OutputStream.Write($content, 0, $content.Length)
    } else {
      $body    = [System.Text.Encoding]::UTF8.GetBytes("404 - Not Found")
      $response.StatusCode      = 404
      $response.ContentType     = "text/plain"
      $response.ContentLength64 = $body.Length
      $response.OutputStream.Write($body, 0, $body.Length)
    }

    $response.OutputStream.Close()
  }
} finally {
  $listener.Stop()
}
