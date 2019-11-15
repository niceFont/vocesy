
let CKEditor, BalloonEditor
if (typeof window !== "undefined") {
	CKEditor = require("@ckeditor/ckeditor5-react")
	BalloonEditor = require("@ckeditor/ckeditor5-build-balloon")
}



const Renderer = (props) => {

    return (
        <CKEditor
            data={props.data}
            disabled
            editor={BalloonEditor}
        >
        </CKEditor>
    ) 
}


export default Renderer