const loadCategorise = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategorise(data.categories))
    .catch((error) => console.log(error));
};
const loadVideos = () => {
  fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideo(data.videos))
    .catch((error) => console.log(error));
};

function getTimeString(time) {
  const hour = parseInt(time / 3600);
  const remainsecend = parseInt(time % 3600);
  const minit = parseInt(remainsecend / 60);
  const secend = remainsecend % 60;
  return `${hour} hour ${minit} minit ${secend} secend ago`;
}

const loadDetails = async(videoId) => {
  console.log(videoId)
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
  );
  const data = await res.json()
  displayDetails(data.video);
}
// {category_id: '1001', video_id: 'aaab', thumbnail: 'https://i.ibb.co/QPNzYVy/moonlight.jpg', title: 'Midnight Serenade', authors: Array(1), …}
// authors
// : 
// [{…}]
// category_id
// : 
// "1001"
// description
// : 
// "'Midnight Serenade' by Noah Walker is a soulful journey into the depths of the night, capturing the mystique and allure of a moonlit evening. With 543K views, this song brings together tender melodies and evocative lyrics, making it a favorite among listeners seeking a contemplative yet uplifting experience. Immerse yourself in this musical masterpiece and feel the calm embrace of the night."
// others
// : 
// {views: '543K', posted_date: ''}
// thumbnail
// : 
// "https://i.ibb.co/QPNzYVy/moonlight.jpg"
// title
// : 
// "Midnight Serenade"
// video_id
// : 
// "aaab"
// [[Prototype]]
// : 
// Object

const displayDetails = (video) => {
  console.log(video)
  const modal = document.querySelector('.modal')
  const closeBtn = document.querySelector(".modal__close__button");
  const modalContent = document.getElementById("modal__content");
  modalContent.innerHTML = `
<div class="card__images__box">
    <img
            src="${video.thumbnail}"
            alt=""
            class="card__images"
          />
          
          ${
            video.others?.posted_date?.length == 0
              ? ""
              : `<div class="video__time"><p>${getTimeString(
                  video.others.posted_date
                )}</p></div>`
          }
          </div>
          
          <div class="video__details__area">
            <div class="title__img__and__text">
            <div class ="title__img__box">
              <img src="${
                video.authors[0].profile_picture
              }" alt="" class="c__name__logo" />
            </div>
            <h4 class="video__title">
              ${video.title}
            </h4>
            <div class="youtube__Cname__and__icon">
              <p class="c__name">${video.authors[0].profile_name}</p>
              <div class="icon__section">
                ${
                  video.authors[0].verified === true
                    ? `<img src="image/blueTik.svg" alt="" class="c__" />`
                    : ""
                }
              </div>
            </div>
            <p class="view">${video.others.views}</p>
          </div>
          <p class='modal__description'>${video.description}</p>
  `;
  const modalContainer = document.querySelector(".modal__container");
  modalContainer.style.display = 'flex'
    setTimeout(() => {
      modal.style.transform = "scale(1)";
    }, 10);
  closeBtn.addEventListener('click', () => {
      modal.style.transform = "scale(0.1)";
      setTimeout(() => {
        modalContainer.style.display = "none";
      }, 300);
    
  })
}

const activeClassRemove = () => {
  const buttons = document.getElementsByClassName("category__btn");
  for (let btn of buttons) {
    btn.classList.remove("active");
  }
};

const categoryVideo = (id) => {
  // alert(id);
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      activeClassRemove();
      const activeBtn = document.getElementById(`btn-${id}`);
      activeBtn.classList.add("active");
      displayVideo(data.category);
    })
    .catch((error) => console.log(error));
};

const displayVideo = (videos) => {
  const videoContainer = document.getElementById("videos");
  videoContainer.innerHTML = "";

  if (videos.length == 0) {
    videoContainer.innerHTML = `
    
      <div class="no__contant__img__and__text__box">
        <div class="no__contant__img">
          <img src="image/Icon.png" alt="">
        </div>
        <div class="no__contant__text">
          <h2>Oops!! Sorry, There is no content here</h2>
        </div>
      </div>
    
    `;
    return;
  }

  videos.forEach((video) => {
    console.log(video);
    const card = document.createElement("div");
    card.classList = "card__main__box";
    card.innerHTML = `<div class="card__images__box">
    <img
            src="${video.thumbnail}"
            alt=""
            class="card__images"
          />
          
          ${
            video.others?.posted_date?.length == 0
              ? ""
              : `<div class="video__time"><p>${getTimeString(
                  video.others.posted_date
                )}</p></div>`
          }
          </div>
          
          <div class="video__details__area">
            <div class="title__img__and__text">
            <div class ="title__img__box">
              <img src="${
                video.authors[0].profile_picture
              }" alt="" class="c__name__logo" />
            </div>
            <h4 class="video__title">
              ${video.title}
            </h4>
            <div><button onclick="loadDetails('${video.video_id}')" class= 'btn__details'>details</button></div>
            </div>
            <div class="youtube__Cname__and__icon">
              <p class="c__name">${video.authors[0].profile_name}</p>
              <div class="icon__section">
                ${
                  video.authors[0].verified === true
                    ? `<img src="image/blueTik.svg" alt="" class="c__" />`
                    : ""
                }
              </div>
            </div>
            <p class="view">${video.others.views}</p>
          </div>
          `;
    videoContainer.append(card);
  });
};

const displayCategorise = (categorise) => {
  const categoryContainer = document.getElementById("categorise");
  categorise.forEach((item) => {
    console.log(item);
    const buttonContainer = document.createElement("div");
    buttonContainer.innerHTML = `
    <button onclick="categoryVideo(${item.category_id})" id ="btn-${item.category_id}" class ="btn category__btn">
    ${item.category}
    </button>
    `;
    categoryContainer.append(buttonContainer);
  });
};
//
loadCategorise();
loadVideos();
