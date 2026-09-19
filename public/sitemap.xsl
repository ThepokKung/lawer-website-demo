<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0" 
  xmlns:html="http://www.w3.org/TR/REC-html40"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="th">
      <head>
        <title>XML Sitemap | THANPRAT LAWYER CO., LTD.</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Sarabun", sans-serif;
            color: #1e293b;
            background-color: #f8fafc;
            margin: 0;
            padding: 30px 20px;
          }
          .container {
            max-width: 1080px;
            margin: 0 auto;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 4px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
            overflow: hidden;
          }
          .header {
            background-color: #061811;
            color: #ffffff;
            padding: 32px 36px;
            border-bottom: 3px solid #C59B42;
          }
          .header h1 {
            margin: 0 0 8px 0;
            font-size: 24px;
            font-weight: 700;
            letter-spacing: -0.02em;
            color: #ffffff;
          }
          .header p {
            margin: 0;
            font-size: 14px;
            color: #cbd5e1;
            line-height: 1.6;
          }
          .info-box {
            padding: 18px 36px;
            background-color: #f1f5f9;
            border-bottom: 1px solid #e2e8f0;
            font-size: 13px;
            color: #475569;
          }
          .info-box a {
            color: #061811;
            font-weight: 600;
            text-decoration: underline;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 13px;
          }
          th {
            background-color: #f8fafc;
            color: #061811;
            text-align: left;
            padding: 12px 18px;
            font-weight: 600;
            border-bottom: 2px solid #e2e8f0;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-size: 11px;
          }
          td {
            padding: 12px 18px;
            border-bottom: 1px solid #f1f5f9;
            color: #334155;
            vertical-align: middle;
          }
          tr:hover td {
            background-color: #f8fafc;
          }
          td a {
            color: #12372c;
            text-decoration: none;
            font-weight: 500;
            word-break: break-all;
          }
          td a:hover {
            color: #C59B42;
            text-decoration: underline;
          }
          .count-badge {
            display: inline-block;
            background: #E8D6AC;
            color: #061811;
            padding: 2px 8px;
            border-radius: 2px;
            font-weight: 700;
            font-size: 12px;
            margin-left: 8px;
          }
          .footer {
            padding: 20px 36px;
            text-align: center;
            font-size: 12px;
            color: #94a3b8;
            background-color: #ffffff;
            border-top: 1px solid #f1f5f9;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>XML Sitemap</h1>
            <p>THANPRAT LAWYER CO., LTD. (บริษัท ธันปรัท ทนายความ จำกัด)</p>
          </div>
          
          <xsl:apply-templates/>
          
          <div class="footer">
            Generated automatically for Search Engine Crawlers (Googlebot, Bingbot).
          </div>
        </div>
      </body>
    </html>
  </xsl:template>

  <!-- Template for Sitemap Index -->
  <xsl:template match="sitemap:sitemapindex">
    <div class="info-box">
      This is the <strong>Sitemap Index</strong> file pointing to sub-sitemaps.
      Total sitemaps: <span class="count-badge"><xsl:value-of select="count(sitemap:sitemap)"/></span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width: 60px;">#</th>
          <th>Sitemap Sub-file URL</th>
        </tr>
      </thead>
      <tbody>
        <xsl:for-each select="sitemap:sitemap">
          <tr>
            <td><xsl:value-of select="position()"/></td>
            <td>
              <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
            </td>
          </tr>
        </xsl:for-each>
      </tbody>
    </table>
  </xsl:template>

  <!-- Template for Urlset -->
  <xsl:template match="sitemap:urlset">
    <div class="info-box">
      This sitemap contains all indexed URLs of the website. 
      Total indexed URLs: <span class="count-badge"><xsl:value-of select="count(sitemap:url)"/></span>
    </div>
    <table>
      <thead>
        <tr>
          <th style="width: 50px;">#</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        <xsl:for-each select="sitemap:url">
          <tr>
            <td><xsl:value-of select="position()"/></td>
            <td>
              <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc"/></a>
            </td>
          </tr>
        </xsl:for-each>
      </tbody>
    </table>
  </xsl:template>
</xsl:stylesheet>
