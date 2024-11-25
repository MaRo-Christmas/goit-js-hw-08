'use strict'

document.addEventListener('DOMContentLoaded', function () {
  const gallery = document.querySelector('.gallery')
  const images = [
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820__480.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/14/16/43/rchids-4202820_1280.jpg',
      description: 'Hokkaido Flower',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
      description: 'Container Haulage Freight',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
      description: 'Aerial Beach View',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
      description: 'Flower Blooms',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
      description: 'Alpine Mountains',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
      description: 'Mountain Lake Sailing',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
      description: 'Alpine Spring Meadows',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
      description: 'Nature Landscape',
    },
    {
      preview:
        'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
      original:
        'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
      description: 'Lighthouse Coast Sea',
    },
  ]

  const markup = images
    .map(
      (image, index) =>
        `<li class="gallery-item">
      <img src="${image.original}" alt="${image.description}" data-index="${index}" class="gallery-image">
    </li>`
    )
    .join('')

  gallery.insertAdjacentHTML('afterbegin', markup)

  gallery.addEventListener('click', (event) => {
    if (event.target.classList.contains('gallery-image')) {
      openModal(event.target.dataset.index)
    }
  })

  let currentIndex = 0
  let instance = null

  function openModal(index) {
    currentIndex = index
    const { original, description } = images[currentIndex]

    instance = basicLightbox.create(
      `
    <div class="modal-content">
      <img src="${original}" alt="${description}" class="modal-image">
      <button class="btn-modal prev">
        <img src="icons/bi_chevron-left.svg" alt="Previous">
      </button>
      <button class="btn-modal next">
        <img src="icons/bi_chevron-right.svg" alt="Next">
      </button>
      <button class="close-modal">
        <img src="icons/bi_x.svg" alt="Close">
      </button>
    </div>
  `,
      {
        onShow: (instance) => {
          document.addEventListener('keydown', onKeyDown)
          instance
            .element()
            .querySelector('.prev')
            .addEventListener('click', () => showImage(-1))
          instance
            .element()
            .querySelector('.next')
            .addEventListener('click', () => showImage(1))
          instance
            .element()
            .querySelector('.close-modal')
            .addEventListener('click', () => instance.close())
        },
        onClose: (instance) => {
          document.removeEventListener('keydown', onKeyDown)
        },
      }
    )

    instance.show()
  }

  function showImage(direction) {
    currentIndex = (currentIndex + direction + images.length) % images.length
    const { original, description } = images[currentIndex]
    instance.element().querySelector('.modal-image').src = original
    instance.element().querySelector('.modal-image').alt = description
  }

  function onKeyDown(event) {
    if (event.key === 'ArrowLeft') showImage(-1)
    if (event.key === 'ArrowRight') showImage(1)
    if (event.key === 'Escape') instance.close()
  }
})
