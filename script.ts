const notesContainer = document.getElementById("app") as HTMLElement
const addNotesButton = notesContainer.querySelector(".add-note") as HTMLElement

// @ts-ignore
getNotes().map(note =>{
    const noteElement = createNoteElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNotesButton);
})

addNotesButton.addEventListener("click", ()=>addNote());

function getNotes():any{

    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");

}

function saveNotes(notes:[string]):any{
    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));

}


function createNoteElement(id:number, content:string):any{
    const element:any = document.createElement("textarea");
    element.classList.add("note");
    element.value = content;
    element.placeholder = "Empty Sticky Note";

    element.addEventListener("change", ()=>{
        updateNote(id, element.value);
    })

    element.addEventListener("dblclick", ()=>{
        const doDelete = confirm("Are you sure you wish to delete this sticky note?");
        if(doDelete){
            deleteNote(id, element);

        }
    })
    
    return element;
}


function addNote():void{
    const notes = getNotes();
    const noteObject = {
        id: Math.floor(Math.random()* 10000),
        content: ""
    };

    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    notesContainer.insertBefore(noteElement, addNotesButton);

    notes.push(noteObject);

    saveNotes(notes);

}


function updateNote(id:number, newContent:string):any{
    const notes:any = getNotes();
    // @ts-ignore
    const targetNote:any = notes.filter(note => note.id == id)[0];

    targetNote.content = newContent;
    saveNotes(notes);

}

function deleteNote(id:number, element:Node):any{
        // @ts-ignore
    const notes:any = getNotes().filter(note => note.id != id);

    saveNotes(notes);
    notesContainer.removeChild(element);

}