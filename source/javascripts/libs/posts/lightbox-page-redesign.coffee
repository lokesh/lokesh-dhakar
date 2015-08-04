---
---
###
   <pre>
###

$ -> 

  wiper = 
    value: null
    pageHeight: null
    pageWidth: null
    sliderScale: null


    # Set up slider drag events
    init: ->
     
      @size()
      $wiper = $('#wiper')
      
 	    $wiper.on 'valueChange', $.proxy( @update, this)

      $wiper.find('.wiperSliderButton').draggable
        axis: 'y'
        containment: '#wiper .wiperSlider'
        scroll: false
        appendTo: 'body' 

        start: (e, ui) => 
          $this = $(e.target)
          # Slider height minus button height is the total distance the button can travel up an down
          @sliderScale = $this.closest('.container').height() - $this.height()
          return

        drag: (e, ui) => 
          @value = ui.position.top / @sliderScale
          $wiper.trigger 'valueChange'
          return

    # Update page wipe position when slider value changes
    update: () ->
      $wiper = $('#wiper')
      $page2 = $wiper.find('div.page2')
      $page2shine = $wiper.find('div.page2shine')

      clientPageHeight = $wiper.find('.page1 img').height()
      height = clientPageHeight * @value
      boxShadowYoffset = parseInt 40 - (40 * @value), 10
      boxShadowBlur = parseInt 100 - (100 * @value), 10
      boxShadowSpread = parseInt 20 - (20 * @value), 10
      gradientStart = 100 - parseInt 50 - (50 * @value), 10
      
      $page2
        .height( height)
        .css
          'box-shadow':  "0px #{boxShadowYoffset}px #{boxShadowBlur}px #{boxShadowSpread}px rgba(0,0,0, 1)"

      $page2shine.height( height)

      $page2shine.css 'background': "-webkit-linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) #{gradientStart}%, rgba(255, 255, 255, 0.2))"
      $page2shine.css 'background': "-moz-linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) #{gradientStart}%, rgba(255, 255, 255, 0.2))"        
      $page2shine.css 'background': "-o-linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) #{gradientStart}%, rgba(255, 255, 255, 0.2))"        
      $page2shine.css 'background': "-ms-linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) #{gradientStart}%, rgba(255, 255, 255, 0.2))"        
      $page2shine.css 'background': "linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, 0) #{gradientStart}%, rgba(255, 255, 255, 0.2))"        
      
      # Show/hide 'click to view' button
      $pageButton = $wiper.find('.pageButton')
      if @value > 0.8 && !$pageButton.hasClass 'on'
          $pageButton.addClass 'on'        
      else if @value <= 0.8 && $pageButton.hasClass 'on'
        $wiper.find('.pageButton').removeClass 'on'

      return


    size: () ->
      $wiper = $('#wiper')
      wiperWidth = $wiper.width()
      wiperHeight = $wiper.height()

      # Store full page height and width
      $page1Image = $wiper.find('.page1 img')
      @pageHeight = $page1Image.height()
      @pageWidth = $page1Image.width()

      # Set page2's width. If we don't set it here, as we play with it's height with the slider
      # the width will change as well as the browser tries to maintain the aspect ratio.
      #
      # 840px is the minimum width we need to have full size images and slider control
      # 700px is the full width of the images
      if wiperWidth >= 860
        $wiper.find('.wiperPages, .page2shine, .page2').width @pageWidth
      else if wiperWidth < 860
        pixelsThin = 860 - wiperWidth
        $wiper.find('.wiperPages, .page2shine, .page2').width 750 - pixelsThin

        # Resize vertically the slider to sync with the shrinking images
        newHeight = $wiper.find('.page1 img').height()
        $wiper.find('.wiperSlider, .wiperSlide').height newHeight
      
      $wiper.find('.wiperSlider').css
        visibility: 'visible'

      # Position 'Click to view' button
      wiperPageWidth = $wiper.find('.wiperPages').width()
      wiperPageHeight = $wiper.find('.wiperPages').height()
      $button = $wiper.find('.pageButton')
      buttonWidth = $button.width()
      buttonHeight = $button.height()
      $button.css
        top: ((wiperPageHeight / 2) - (buttonHeight / 2)) + 'px'
        left: ((wiperPageWidth / 2) - (buttonWidth / 2)) + 'px'

      
  wiper.init()
  
  $(window).bind "resize", wiper.size
   
###
   </pre>
### 