#import "@preview/modern-report-umfds:0.1.2": umfds

// This function gets your whole document as its `body`
// and formats it as a simple letter.
#let t(
  // The letter's sender, which is display at the top of the page.
  title: none,


) = {
  // Configure page and text properties.
  set page(margin: (top: 2.5cm))
  set text(font: "Cambria")
  
  // Display recipient.
  title
/*
  v(0.5cm)

  // Display sender at top of page. If there's no sender
  // add some hidden text to keep the same spacing.
  align(right, if sender == none {
    hide("a")
  } else {
    block[#set align(left)
    #sender
  ]
  })
  /*
  // Display date. If there's no date add some hidden
  // text to keep the same spacing.
  align(right, if date == none {
    hide("a")
  } else {
    block[#set align(left)
    #date
  ]
  })*/

  v(1.5cm)

  // Add the subject line, if any.
  text(12pt, if subject != none {
    pad(right: 20%, strong(subject))
  })
  
  v(0.5cm)

  // Add body and name.
  body
  
  v(1.25cm)
  name*/
}

#let fisrt-page(
  titre: none,
  auteur: none,
  resume : none,
  doc,
) = {
  show: umfds.with(
    abstract: resume,
    title: titre,
    authors: (auteur,),
    date: datetime.today().display("[day] [month repr:long] [year]"),
    lang: "fr",
  )

  doc
}