const getData = async () => {
  return await fetch('./data.json')
    .then((response) => response.json())
    .then((json) => {
      return json;
    });
};

const configureMenu = () => {
  const menuItems = document.querySelectorAll(
    '.dashboard__header > nav > ul > li'
  );
  menuItems.forEach((menuItem) => {
    menuItem.addEventListener('click', async (e) => {
      selectMenuItem(menuItem);
      await setData(e.target.innerText.toLowerCase());
    });
  });
};

const selectMenuItem = (menuItem) => {
  const menuItems = document.querySelectorAll(
    '.dashboard__header > nav > ul > li'
  );
  menuItems.forEach((menuItem) => {
    menuItem.classList.remove('selected');
  });
  menuItem.classList.add('selected');
};

const createTitleContainer = (title) => {
  const titleContainer = document.createElement('div');
  const itemTitle = document.createElement('h3');
  itemTitle.innerText = title;
  const itemIcon = document.createElement('img');
  itemIcon.setAttribute('src', './images/icon-ellipsis.svg');
  itemIcon.setAttribute('alt', 'ellipsis icon');
  titleContainer.appendChild(itemTitle);
  titleContainer.appendChild(itemIcon);
  return titleContainer;
};

const createLastHoursText = (type, hours) => {
  const previousText = {
    daily: 'Last Day',
    weekly: 'Last Week',
    monthly: 'Last Month',
  };
  return previousText[type] + ' - ' + hours + 'hrs';
};

const createHoursContainer = (type, timeframes) => {
  const hoursContainer = document.createElement('div');
  const itemTotalHours = document.createElement('h4');
  itemTotalHours.innerText = timeframes[type].current + 'hrs';
  const itemLastHours = document.createElement('h5');
  itemLastHours.innerText = createLastHoursText(
    type,
    timeframes[type].previous
  );
  hoursContainer.appendChild(itemTotalHours);
  hoursContainer.appendChild(itemLastHours);
  return hoursContainer;
};

const setData = async (type) => {
  const data = await getData();
  const dashboard = document.querySelector('.dashboard__main');
  dashboard.innerHTML = '';
  data.forEach((item) => {
    const itemCard = document.createElement('div');
    itemCard.classList.add('dashboard__main-card');
    itemCard.setAttribute(
      'card-type',
      item.title.toLowerCase().replace(' ', '-')
    );
    const container = document.createElement('section');
    container.appendChild(createTitleContainer(item.title));
    container.appendChild(createHoursContainer(type, item.timeframes));
    itemCard.appendChild(container);
    dashboard.appendChild(itemCard);
  });
};

const main = async () => {
  configureMenu();
  setData('daily');
};

main();
