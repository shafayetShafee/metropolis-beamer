--[[
MIT License

Copyright (c) 2024 Shafayet Khan Shafee

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
]]--

local str = pandoc.utils.stringify

local function ensureHtmlDeps()
  quarto.doc.add_html_dependency({
    name = "metropolis-beamer",
    version = "1.0.0",
    scripts = {
        { 
          path = "resources/js/add_header.js", 
          attribs = {defer = "true"},
          afterBody = true
        }
      }
  })
end

if quarto.doc.is_format('revealjs') then
  -- Ensuring the dependencies got loaded before proceeding
  ensureHtmlDeps()
  
  function Span(el)
      local style = el.attributes["style"] or ""
      local color = el.attributes['color']
      local bg_color = el.attributes['bg']
    
      if color then
        local fcolor = "color: " .. color .. ";"
        el.attributes['color'] = nil
        style = style .. ";" .. fcolor 
    end
    if bg_color then
        local bcolor = "background-color: " .. bg_color .. ";"
        el.attributes['bg-color'] = nil
        style = style .. ";" .. bcolor 
    end
    
    el.attributes['style'] = style
    return el
  end
    
  function Pandoc(doc)
    local blocks = doc.blocks
    local str = pandoc.utils.stringify
    local meta = doc.meta
    -- make divs structure for holding text and logo.
    local header_logo = meta['header-logo'] and str(meta['header-logo']) or ""
    local header_logo_link = meta['header-logo-link'] and str(meta['header-logo-link']) or ""
    local header_img = pandoc.Div(pandoc.Image("", header_logo, ""), {class = "header-logo"})
    
    if header_logo_link ~= "" then
      header_img.attributes['header-logo-link'] = header_logo_link
    end
    
    local header_title = pandoc.Div({pandoc.Para(' ')} ,{class = "header-title"})

    local div = pandoc.Div(
      {
        header_title,
        header_img
      }, 
      {class = 'reveal-header'})
    table.insert(blocks, div)
    return doc
  end
end