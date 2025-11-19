let boxes = document.getElementsByClassName("text");
let searchBox = document.getElementById('searchTextBox');
let explainBox = document.getElementById('explainTextBox');
let concluded = document.getElementById('cocludedTextBox');
let searchColumn = document.getElementById('search');
let explainColumn = document.getElementById('explain');
let concludedColumn = document.getElementById('concluded');
let searchAdd = document.getElementById('searchAddBox');
let explainAdd = document.getElementById('explainAdd');
let concludedAdd = document.getElementById('concludedAdd');
let root = document.getElementById('root');
let trash = document.getElementById('trash');

let cards = JSON.parse(localStorage.getItem("dragCards")) || [];
cards.forEach(el => {
  createCards(el)
  draggable()
});

let selected = null;

function draggable(){
  for( let box of boxes){
  box.setAttribute("draggable", true)

  box.addEventListener("dragstart", function(e){
    selected = e.target;
  });
  }
}
draggable()


explainColumn.addEventListener("dragover", function(e){
      e.preventDefault();
    });

explainColumn.addEventListener("drop", function(e){
  if(selected) {
      explainBox.appendChild(selected);
      update(explainBox)
      selected = null;
  }
    
});


searchColumn.addEventListener("dragover", function(e){
      e.preventDefault();
    });

searchColumn.addEventListener("drop", function(e){
  if(selected) {
      searchBox.appendChild(selected);
      update(searchBox)
      selected = null;
  }
    
});

concludedColumn.addEventListener("dragover", function(e){
      e.preventDefault();
    });

concludedColumn.addEventListener("drop", function(e){
  if(selected) {
      concluded.appendChild(selected);
      update(concluded)
      selected = null;
  }
    
});
  
  
function modal(column){
  const modalBody = document.createElement('div');
  const box = document.createElement('div');
  const input = document.createElement('input');

  root.appendChild(modalBody);
  modalBody.appendChild(box);
  box.appendChild(input);

  modalBody.classList.add('modalBody');
  box.classList.add('modalBox');
  input.classList.add('modalInput');
  modalBody.id = 'modalBody';
  input.placeholder = 'Insert here'
  input.focus();

  input.addEventListener("keydown", function(e){
    if(e.key ==='Enter' && input.value !== ""){

      cards.push({text: input.value, column: column.id});
      localStorage.setItem("dragCards",JSON.stringify(cards));
      modalBody.style.display = 'none'

      const what = (cards.find(t => t.text === input.value))
      createCards(what)
      draggable()
      input.value = ""
    }
  })
  modalBody.addEventListener("click", function(e){
    if (e.target.id === 'modalBody'){
      modalBody.style.display = 'none'
      console.log(e.target)
    }
  })
}

function createCards(element){
    let text = document.createElement('div');
    text.innerHTML = element.text;
    text.classList.add('text');  
    let container = document.getElementById(element.column);
    container.appendChild(text);     
}

searchAdd.addEventListener('click', function(){
  modal(searchBox)
});

explainAdd.addEventListener('click', function(){
  modal(explainBox)
});

concludedAdd.addEventListener('click', function(){
  modal(concluded)
});

function update(box){
  let textContent = selected.innerHTML;
  let card = cards.find(c => c.text === textContent);
  if (card) {
      card.column = box.id;
      localStorage.setItem("dragCards", JSON.stringify(cards));
    }
}

function trashF(){
  trash.addEventListener("dragover", function(e){
    e.preventDefault();
  });

  trash.addEventListener("drop", function(e){
    const deleteCard = cards.find(d => d.text === selected.innerHTML)
    cards = cards.filter(item => item !== deleteCard)
    localStorage.setItem("dragCards", JSON.stringify(cards));
    selected.remove()
    console.log(cards)
  })
}

trashF()