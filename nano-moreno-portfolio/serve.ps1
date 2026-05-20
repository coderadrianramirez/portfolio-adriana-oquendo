# Static preview server for nano-moreno-portfolio
param([int]$Port = 5174)

$rootPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()

Write-Output "Serving NANO MORENO portfolio at http://localhost:$Port"
Write-Output "Press Ctrl+C to stop."

$mimeTypes = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "application/javascript"
  ".json" = "application/json"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".svg"  = "image/svg+xml"
  ".ico"  = "image/x-icon"
  ".woff2"= "font/woff2"
}

try {
  while ($listener.IsListening) {
    $context  = $listener.GetContext()
    $request  = $context.Request
    $response = $context.Response

    $localPath = $request.Url.LocalPath
    # Default to preview.html (the self-contained demo)
    if ($localPath -eq "/" -or $localPath -eq "") { $localPath = "/preview.html" }

    $filePath = Join-Path $rootPath ($localPath.TrimStart('/').Replace('/', '\'))

    try {
      if (Test-Path $filePath -PathType Leaf) {
        $ext      = [System.IO.Path]::GetExtension($filePath).ToLower()
        $mime     = if ($mimeTypes[$ext]) { $mimeTypes[$ext] } else { "application/octet-stream" }
        $fileInfo = New-Object System.IO.FileInfo($filePath)

        $response.StatusCode      = 200
        $response.ContentType     = $mime
        $response.ContentLength64 = $fileInfo.Length

        $fs = [System.IO.File]::OpenRead($filePath)
        try   { $fs.CopyTo($response.OutputStream) }
        finally { $fs.Dispose() }
      } else {
        $body = [System.Text.Encoding]::UTF8.GetBytes("404 - Not Found: $localPath")
        $response.StatusCode      = 404
        $response.ContentType     = "text/plain; charset=utf-8"
        $response.ContentLength64 = [long]$body.Length
        $response.OutputStream.Write($body, 0, $body.Length)
      }
    } catch { }
    finally {
      try { $response.OutputStream.Close() } catch {}
    }
  }
} finally {
  $listener.Stop()
}
