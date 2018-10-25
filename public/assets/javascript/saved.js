$(document).ready(function() {
    var articleContainer = $(".-article-container");

    $(document).on("click", "btn.delete", handleArticleDelete);
    $(document).on("click", ".btn.notes", handleArticleNotes);
    $(document).on("click", "btn.save", handleNoteSave);
    $(document).on("click", "btn.note-delete", handleNoteDelete);


initPage();

function initPage() {
    articleContainer.empty();
    $.get("/api/headlines?saved=true").then(function(data){
        if (data && data.length) {
            renderArticles(data);
        } else {
            renderEmpty();
        }
    });
}

function renderArticles(articles) {
    var articlePanels = [];

    for (var i = 0; i < articles.length; i++) {
        articlePanels.push(createPanel(articles[i]));
    }
}


var notesToRender = [];
var currentNote;
if(!data.notes.length) {

    currentNote = [
        "<li class='list-group-item'>",
        "No notes for this article for this article yet.",
        "</li>"

    ].join("");
    noteToRender.push(currentNote);
}
else {
    for (var i =0; i < data.notes.length; i ++) {
        currentNote = $([
            "<li class='class-item note'>",
            data.notes[i].noteText,
            "<button class='btn btn-danger note-delete'>x</button>",
           "</li>"
        ].join(""));

        currentNote.children("button").data("_id", data.notes[i]._id);
        notesToRender.push(currentNote);
    }
}


$(".note-container").append(notesToRender);


function handleArticleDelete() {
    var articleToDelete = $(this).parents(".panel").data();
    $.ajax({
        method: "DELETE",
        url: "/api/headlines/" + articleToDelete._id
    }).then(function(data){
        if(data.ok) {
            initPage();
        }
    })
}

function handleArticleNotes() {

    var currentArticleNotes = () => {
        $.get("/api/notes" + currentArticle.id).then(function(data) {
           var modalText = 
"<div class='container-fluid text-center'>" +
"<h4>Notes For Articles: " +
currentArticle._id +
"</h4/>"
"<hr />" +
"<ul class='list-group note-container'>" +
"<textarea placeholder='New Note' rows='4' cols='60'></textarea>"+
"<button class='btn btn-success save'Save Note<button>" +
"</div>"
        })
    }

bootbox.dialog({
    message: modalText,
    closeButton: true
});
var noteData = {
    _id: currentArticle.id,
    notes: data || []
};

$(".btn.save").data("article", noteData);

renderNotesList(noteData);

function handleNoteSave() {
    var noteData;
    var newNote = $(".bootbox-body textarea").val().trim();

    if(newNote) {
        noteData = {
            _id: $(this).data("article")._id,
        noteText: newNote        
    };
    $.post("/api/nottes", noteData.then(function() {
        bootbox.hideAll();
    }))
    }
    }

    function handleNoteDelete () {

        var noteToDelete = $(this).data("_id");

        $.ajax({
            url: "/api/notes" + noteToDelete,
            method: "DELETE"
        }).then(function() {
            bootbox.hideAll();
        });
        }
    }
    });