let counter = 4;

function addFileInput() {
    counter++;
    const container = document.getElementById('input-container');

    const newLabel = document.createElement('label');
    newLabel.setAttribute('class', 'picture hidden');
    newLabel.setAttribute('for', `picture__input${counter}`);
    newLabel.setAttribute('tabIndex', '0');

    const newSpan = document.createElement('span');
    newSpan.setAttribute('class', 'picture__image');
    newSpan.textContent = `Choose an image`;
    newLabel.appendChild(newSpan);

    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'file');
    newInput.setAttribute('name', 'pic  ');
    newInput.setAttribute('id', `picture__input${counter}`);
    newInput.setAttribute('required', true);
    newInput.classList.add('hidden');

    container.appendChild(newLabel);
    container.appendChild(newInput);

    handleFileInput(newInput.id);
}

function handleFileInput(inputId) {
    const inputFile = document.querySelector(`#${inputId}`);
    const pictureImage = inputFile.previousElementSibling.querySelector(".picture__image");
    const pictureImageTxt = "Choose an image";
    pictureImage.innerHTML = pictureImageTxt;

    inputFile.addEventListener("change", function (e) {
        const inputTarget = e.target;
        const file = inputTarget.files[0];

        if (file) {
            const reader = new FileReader();

            reader.addEventListener("load", function (e) {
                const readerTarget = e.target;

                const img = document.createElement("img");
                img.src = readerTarget.result;
                img.classList.add("picture__img");

                pictureImage.innerHTML = "";
                pictureImage.appendChild(img);

                const deleteBtn = document.createElement('button');
                deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
                deleteBtn.classList.add('delete-btn');
                pictureImage.appendChild(deleteBtn);

                deleteBtn.addEventListener('click', function () {
                    pictureImage.innerHTML = pictureImageTxt;
                    inputFile.value = ''; // Clear the input file
                    inputFile.disabled = true; // Disable the input file

                    // Re-enable the input file when the label is clicked
                    const label = inputFile.previousElementSibling;
                    label.addEventListener('click', function () {
                        inputFile.disabled = false;
                    }, { once: true });
                });
            });

            reader.readAsDataURL(file);
        } else {
            pictureImage.innerHTML = pictureImageTxt;
        }
    });
}

// Initialize file inputs
handleFileInput("picture__input1");
handleFileInput("picture__input2");
handleFileInput("picture__input3");
handleFileInput("picture__input4");





// jQuery for Modal Menu Toggle
$(function () {
    $('.modal-trigger').click(function (e) {
        e.preventDefault();
        if ($(this).hasClass('active')) {
            $(this).removeClass('active').next('.modal-menu').removeClass('is-visible');
        } else {
            $('.modal-trigger.active').removeClass('active').next('.modal-menu').removeClass('is-visible');
            $(this).addClass('active').next('.modal-menu').addClass('is-visible');
        }
    });

    $(document).click(function (e) {
        var target = e.target;
        if (!$(target).is('.modal-menu li a') && !$(target).siblings().is('.modal-menu')) {
            $('.modal-menu').removeClass('is-visible');
            $('.modal-trigger.active').removeClass('active');
        }
    });
});



const tabButtons = document.querySelectorAll('.tab-btn')

tabButtons.forEach((tab) => {
  tab.addEventListener('click', () => tabClicked(tab))
})

function tabClicked(tab) {

  tabButtons.forEach(tab => {
    tab.classList.remove('active')
  })
  tab.classList.add('active')

  const contents = document.querySelectorAll('.content')

  contents.forEach((content) => {
    content.classList.remove('show')
  })

  const contentId = tab.getAttribute('content-id')
  const contentSelected = document.getElementById(contentId)

  contentSelected.classList.add('show')
  //console.log(contentId)
}

const progress = document.getElementById('progress');
const prev = document.getElementById('prev');
const nex = document.getElementById('next');
const circles = document.querySelectorAll('.circle');

let currentActive = 1;

next.addEventListener('click', () => {
  currentActive++;
  if (currentActive > circles.length) {
    currentActive = circles.Length;
  }

  update();
})

prev.addEventListener('click', () => {
  currentActive--;
  if (currentActive < 1) {
    currentActive = 1;

  }
  update();
})

function update() {
  circles.forEach((circle, i) => {
    if (i < currentActive) {
      circle.classList.add('active');
    } else {
      circle.classList.remove('active');
    }

  })


}









