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


// More Details
$(function () {
  // toggle the menu, hide others
  $('.modal-trigger').click(function (e) {
    e.preventDefault();
    if ($(this).hasClass('active')) {
      $(this).removeClass('active').next('.modal-menu').removeClass('is-visible');
    } else {
      $('.modal-trigger.active').removeClass('active').next('.modal-menu').removeClass('is-visible');
      $(this).addClass('active').next('.modal-menu').addClass('is-visible');
    }
  });

  // hide menu when clicking outside
  $(document).click(function (e) {
    var target = e.target;
    if (!$(target).is('.modal-menu li a') && !$(target).siblings().is('.modal-menu')) {
      $('.modal-menu').removeClass('is-visible');
      $('.modal-trigger.active').removeClass('active');
    }
  });

});



// Select all delete buttons and product cards
// Select all product cards
const products = document.querySelectorAll('.card');

// Iterate over each product card
products.forEach(product => {
  // Find the delete button within the current product card
  const deleteBtn = product.querySelector('.delete-btn');

  // Attach a click event listener to the delete button
  deleteBtn.addEventListener('click', function () {
    // Hide the product card when the delete button is clicked
    product.style.display = 'none';
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.content');
  
  // Load saved card positions from localStorage
  loadCards();

  tabButtons.forEach(button => {
      button.addEventListener('click', () => {
          tabButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');

          const contentId = button.getAttribute('content-id');
          tabContents.forEach(content => {
              content.classList.remove('show');
              if (content.id === contentId) {
                  content.classList.add('show');
              }
          });
      });
  });

  // Function to load cards from localStorage
  function loadCards() {
      const activeContent = document.getElementById('active').querySelector('.content-info');
      const disabledContent = document.getElementById('disabled').querySelector('.content-info');

      const savedDisabledIds = JSON.parse(localStorage.getItem('savedDisabledIds')) || [];

      savedDisabledIds.forEach(id => {
          const card = document.getElementById(id);
          if (card) {
              disabledContent.appendChild(card);
          }
      });
  }

  // Function to save card positions to localStorage
  function saveCards() {
      const activeContent = document.getElementById('active').querySelector('.content-info');
      const disabledContent = document.getElementById('disabled').querySelector('.content-info');

      const activeIds = Array.from(activeContent.children).map(card => card.id);
      const disabledIds = Array.from(disabledContent.children).map(card => card.id);

      // Save only the disabled card IDs
      localStorage.setItem('savedDisabledIds', JSON.stringify(disabledIds));
  }

  // Activate/deactivate card logic
  document.addEventListener('click', (e) => {
      const link = e.target.closest('.activate');
      if (link) {
          e.preventDefault();
          const card = link.closest('.card');
          const currentContent = card.closest('.content');
          const isActive = currentContent.id === 'active';
          const targetContentId = isActive ? 'disabled' : 'active';
          const targetContent = document.getElementById(targetContentId).querySelector('.content-info');

          // Move the card to the target content section
          targetContent.insertBefore(card, targetContent.firstChild); // Insert card before the first child

          // Save updated card positions
          saveCards();
      }
  });
});


