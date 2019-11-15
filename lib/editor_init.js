

const config = {
   
   toolbar : ["Heading","|","Bold", "Italic", "BulletedList", "NumberedList","BlockQuote", "|", "Undo", "Redo" ],
   
   heading : {
       options: [
           { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
           { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
           { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
           { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
       ]
   },

    indentBlock: {
        offset: 1,
        unit: "em"
   }

}

export default config