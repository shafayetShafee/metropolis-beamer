/**
 * reveal-header
 * A filter that adds header text and logo.
 * 
 * MIT License
 * Copyright (c) 2023-2024 Shafayet Khan Shafee.
 */

function header() {
  
  // add the header structure as the firstChild of div.reveal-header
  function add_header() {
    let header = document.querySelector("div.reveal-header");
    let reveal = document.querySelector(".reveal");
    reveal.insertBefore(header, reveal.firstChild);
    
    let header_title_p_placeholder = document.querySelector('div.header-title > p');
    let header_title_h2_placeholder = document.createElement('h2');
    header_title_p_placeholder.replaceWith(header_title_h2_placeholder);
    
    logo_img = document.querySelector('.header-logo > img');
    if (logo_img?.getAttribute('src') == null) {
      if (logo_img?.getAttribute('data-src') != null) {
        logo_img.src = logo_img?.getAttribute('data-src') || "";
        logo_img.removeAttribute('data-src'); 
      };
    };
  };
  
  
  function make_h2_title() {
    let h2_text = Reveal.getCurrentSlide().getAttribute('data-h2-text');
    let header_title_placeholder = document.querySelector('div.header-title > h2');
    header_title_placeholder.innerText = h2_text;
    
    let header_div = document.querySelector('div.reveal-header');
    
    if(Reveal.getCurrentSlide().id == 'title-slide' ||
       Reveal.getCurrentSlide().classList.contains('title-slide') || h2_text == ''
       ) {
      header_div.style.visibility = 'hidden';
    } else {
      header_div.style.visibility = 'visible';
      header_title_placeholder.style.color = 'white';
    };
  };
  
  
  function linkify_logo(logo, href) {
    const logo_cloned = logo.cloneNode(true);
    const link = document.createElement('a');
    link.href = href;
    link.target = '_blank';
    link.appendChild(logo_cloned);
    logo.replaceWith(link);
  };
    
  function get_clean_attrs(elem, attrName) {
    let attrVal = elem.getAttribute(attrName);
    if (attrVal != null) {
     elem.removeAttribute(attrName); 
    }
    return attrVal;
  };
  
  
  if (Reveal.isReady()) {
    add_header();
    
    const slides = Reveal.getSlides();
    slides.forEach(slide => {
      const h2Element = slide.querySelector('h2');
      
      if (h2Element) {
        h2Element.style.display = 'none';
        const h2Text = h2Element.textContent;
        slide.setAttribute('data-h2-text', h2Text);
      } else {
        slide.setAttribute('data-h2-text', '');
      };
  });
    
    make_h2_title();
    
    /*************** linkifying the header and footer logo ********************/
    const header_logo = document.querySelector('div.header-logo');
    if (header_logo != null) {
      const header_logo_link = get_clean_attrs(header_logo, 'data-header-logo-link');
      const footer_logo_link = get_clean_attrs(header_logo, 'data-footer-logo-link');
      
      if (header_logo_link != null) {
        const header_logo_img = document.querySelector('div.header-logo').firstElementChild;
        linkify_logo(header_logo_img, header_logo_link);
      };
      
    };
    /****************************** END ***************************************/
    
    Reveal.on( 'slidechanged', event => {
      make_h2_title();
    });
    
  };
};


window.addEventListener("load", (event) => {
  header();
});
