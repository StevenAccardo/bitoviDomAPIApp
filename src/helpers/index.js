//creates an element and inserts it into the DOM
export class CreateElement {
  constructor(parentNode, element, attrArr = null, innerhtml = null) {
    if (parentNode && element) {
      //Create the actual element
      const el = document.createElement(element);
      if (attrArr && attrArr.length) {
        //loop through array of attribute objects and set attributes on newly created element
        attrArr.forEach(attr => {
          if (typeof attr === 'object') {
            const key = Object.keys(attr)[0];
            el.setAttribute(key, attr[key]);
          }
        });
      }
      //If an innerHTML string or number was passed in
      if (innerhtml && (typeof innerhtml === 'string' || innerhtml === 'number')) {
        el.innerHTML = innerhtml;
      }

      document.querySelector(parentNode).appendChild(el);
    } else {
      return null;
    }
  }
}

//Builds out the input and autoComplete search capability
export class BuildSearch {
  constructor(inputEl, placeholder, teamData) {
    if (inputEl && teamData) {
      //Returns a new array with just the names of each team member
      const nameArr = teamData.map(member => member.name);
      //determines an index for the datalist and input to use
      const newIndex = this.getNewIndex();
      //creates the dataList el
      const newDataList = this.createDataList(newIndex, nameArr);
      //Builds out the input linking it to the dataList
      this.buildInput(inputEl, placeholder, newIndex);
      //insers the dataList into the dom
      this.insertDataList(inputEl, newDataList);
    }
  }

  //returns a number to append on to the new dataList depending on how many others have already been created
  getNewIndex() {
    const nodeList = document.querySelectorAll('[id^="teamList"]');
    //If no other IDs that start with teamList, then we can assign an attr. of id="teamList-0"
    if (!nodeList) {
      return 0;
      //If there is already an id that starts with teamList, we can't create another, so we are going to append a number on the end that will make the new id unique from the others. We come up with that number to append by finding the index of the last of the nodeList and adding 1.
    } else {
      const nodeArr = [...nodeList];
      const lastItem = nodeArr[nodeArr.length - 1];
      const lastIndex = nodeArr.lastIndexOf(lastItem);
      return lastIndex + 1;
    }
  }

  //Builds up the input
  buildInput(inputEl, placeholder, newIndex) {
    //selects the input via the class or id of the input that was passed in
    const input = document.querySelector(inputEl);
    if (placeholder) {
      input.setAttribute('placeholder', placeholder);
    }
    //assignes list attr. with vlaue that matches id of the dataList
    input.setAttribute('list', `teamList-${newIndex}`);
  }

  //Creates the DataList
  createDataList(newIndex, nameArr) {
    const dataList = document.createElement('datalist');
    dataList.setAttribute('id', `teamList-${newIndex}`);
    dataList.setAttribute('class', 'teamList');
    //iterate through the nameArr, and create an option element for each index within the newly created DataList
    nameArr.forEach(name => {
      const option = document.createElement('option');
      option.setAttribute('value', name);
      dataList.appendChild(option);
    });

    return dataList;
  }

  //inserts the DataList
  insertDataList(inputEl, newDataList) {
    const input = document.querySelector(inputEl);
    //Will place the dataList before the next sibling to the input, if the input is the last child of the parentNode, then the new node will be put after the input still because the insertBefore method handles the case where there is no nextSibling by returning null and placing the new node at the end.
    input.parentNode.insertBefore(newDataList, input.nextSibling);
  }
}

//Creates a bootstrap card that holds a team member's details
export const buildProfile = (inputEl, parentSel, teamData) => {
  //Returns a semi-random color to be used as a bg-color
  const getColor = () => {
    const colorArr = ['lightgreen', 'lightblue', 'red', 'pink', 'orange', 'yellow', 'purple', 'violet', 'lightgrey', 'lime'];
    return colorArr[Math.floor(Math.random() * 10)];
  };
  //Creates the actual profile
  const createProfile = (value, memObj) => {
    //creates bootstrap card
    const card = document.createElement('div');
    card.setAttribute('class', 'card');
    //pulls the '.' or '#'
    const cleanInputRef = inputEl.substring(1);
    //set attribute so that we can link inputs and profiles together, so when a new member is selected, we know which card to delete, and which to leave alone.
    card.setAttribute('data-inputRef', cleanInputRef);
    //adds a psuedo random background color
    card.style.backgroundColor = getColor();
    const cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body');
    let cardTextName;
    let cardTextTitle;
    let cardTextInterests;
    let cardTextTwitter;
    let cardTextGithub;
    //loops throught the object and uses a switch statement to build out each profile highlight
    for (let prop in memObj) {
      switch (prop) {
        case 'name':
          cardTextName = document.createElement('p');
          cardTextName.setAttribute('class', 'card-text');
          cardTextName.innerHTML = `${prop.toUpperCase()}: ${memObj[prop]}`;
          break;
        case 'title':
          cardTextTitle = document.createElement('p');
          cardTextTitle.setAttribute('class', 'card-text');
          cardTextTitle.innerHTML = `${prop.toUpperCase()}: ${memObj[prop]}`;
          break;
        case 'interests':
          cardTextInterests = document.createElement('p');
          cardTextInterests.setAttribute('class', 'card-text');
          let interestStr = '';
          memObj[prop].forEach((interest, i, arr) => {
            if (i !== arr.length - 1) {
              interestStr += `${interest}, `;
            } else {
              interestStr += interest;
            }
          });
          cardTextInterests.innerHTML = `${prop.toUpperCase()}: ${interestStr}`;
          break;
        case 'twitter':
          if (memObj[prop]) {
            cardTextTwitter = document.createElement('p');
            cardTextTwitter.setAttribute('class', 'card-text');
            const twitterATag = document.createElement('a');
            twitterATag.setAttribute('target', '_blank');
            twitterATag.setAttribute('href', memObj[prop]);
            twitterATag.innerHTML = 'Twitter';
            cardTextTwitter.appendChild(twitterATag);
          } else {
            cardTextTwitter = null;
          }
          break;
        case 'github':
          if (memObj[prop]) {
            cardTextGithub = document.createElement('p');
            cardTextGithub.setAttribute('class', 'card-text');
            const githubATag = document.createElement('a');
            githubATag.setAttribute('target', '_blank');
            githubATag.setAttribute('href', memObj[prop]);
            githubATag.innerHTML = 'GitHub';
            cardTextGithub.appendChild(githubATag);
          }
          break;
      }
    }
    //appends all highlights in proper order and finally onto the DOM
    cardBody.appendChild(cardTextName);
    cardBody.appendChild(cardTextTitle);
    cardBody.appendChild(cardTextInterests);
    if (cardTextTwitter) cardBody.appendChild(cardTextTwitter);
    if (cardTextGithub) cardBody.appendChild(cardTextGithub);
    card.appendChild(cardBody);
    const parentNode = document.querySelector(parentSel);
    parentNode.appendChild(card);
  };

  //When a team member is selected
  const onChange = e => {
    //doesn't continue if input is empty
    if (e.target.value) {
      //grabs the class on the input that was changed
      const targetClass = e.target.getAttribute('class');
      //targets the data-inputRef to grab any profiles linked to that input
      const oldCard = document.querySelector(`[data-inputRef^=${targetClass}]`);

      //if no card exisits, then it creates one, otherwise it removes the old one first
      if (oldCard) oldCard.remove();
      //finds the selected member
      const selectedMember = teamData.filter(member => member.name === e.target.value);
      //selects the member's object
      const selectMemObj = selectedMember[0];
      if (selectMemObj) {
        createProfile(e.target.value, selectMemObj);
      }
    }
  };
  //Adds the event listener to the input that was passed in.
  const input = document.querySelector(inputEl);
  input.addEventListener('change', onChange);
};

//Animates the tortoise
export const animate = el => {
  let pos = 80;
  let id = setInterval(frame, 100);
  function frame() {
    if (pos === 0) {
      clearInterval(id);
    } else {
      pos--;
      el.style.right = pos + '%';
    }
  }
};
