<script runat=server>
   Platform.Response.SetResponseHeader("Strict-Transport-Security","max-age=200");
   Platform.Response.SetResponseHeader("X-XSS-Protection","1; mode=block");
   Platform.Response.SetResponseHeader("X-Frame-Options","Deny");
   Platform.Response.SetResponseHeader("X-Content-Type-Options","nosniff");
   Platform.Response.SetResponseHeader("Referrer-Policy","strict-origin-when-cross-origin");
   Platform.Response.SetResponseHeader("Content-Security-Policy","default-src 'self'");
</script>
