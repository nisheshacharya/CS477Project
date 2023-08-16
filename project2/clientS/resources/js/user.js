window.onload = (() => {
  const BASE_URL = 'http://localhost:3000';

  // Code to handle interactions and dynamic behavior on the user page
  //
  // // Code to fetch and display user's tweets
  // const tweetsContainer = document.querySelector(".tweets");
  //

  //
  // dummyTweets.forEach((tweetText) => {
  //     const tweetElement = document.createElement("div");
  //     tweetElement.classList.add("tweet");
  //     tweetElement.textContent = tweetText;
  //     tweetsContainer.appendChild(tweetElement);
  // });

  const searchResultsContainer = document.querySelector(".searchResults");

  async function getSearchResults(searchKeyword) {
    // const response = await fetch(BASE_URL + '/tweet_users?search=' + searchKeyword,
    //   {
    //       headers: {
    //           'Content-Type': 'application/json'
    //       }
    //   });
    // const filteredUsers = await response.json();
    // populateSearchResults(filteredUsers);


    const dummySearchResults = [
      {
        username: 'User A',
        following: false
      },
      {
        username: 'User B',
        following: true
      },
      {
        username: 'User C',
        following: false
      }
    ];
    populateSearchResults(dummySearchResults);

    // call backend to get search results.
    // return dummySearchResults;
  }

  async function followUser(username) {
    await manageFollow(username, 'follow');
  }

  async function unfollowUser(username) {
    await manageFollow(username, 'unfollow');
  }

  async function manageFollow(username, action) {
    // let id = document.querySelector('#id').innerHTML;    neet to get id creating hiddedn field or using cookie or storage
    // id = '1';
    // await fetch(BASE_URL + `/follow?username=${username}&id=${id}&follow_action=${action}`,
    //   {
    //       headers: {
    //           'Content-Type': 'application/json'
    //       }
    //   });
  }

  let searchField = document.querySelector('.searchField');
  let resultsSection = document.querySelector('.searchResults');

  searchField.addEventListener('keyup', function (event) {
    getSearchResults(event.target.value).then(r => {
    });
    if (event.target.value === '') {
      searchResultsContainer.innerHTML = ''
    }
  });


  function populateSearchResults(filteredResults) {
    searchResultsContainer.innerHTML = '';
    filteredResults.forEach((user) => {
      let username = user.username;
      let following = user.following;
      const resultElement = document.createElement("div");
      resultElement.classList.add("searchResult");
      resultElement.textContent = username;

      const followButton = document.createElement("button");
      followButton.textContent = following === true ? "Unfollow" : "Follow";
      followButton.classList.add("followButton");

      resultElement.appendChild(followButton);
      searchResultsContainer.appendChild(resultElement);

      // Adding event listener to handle follow/unfollow actions
      followButton.addEventListener("click", () => {
        if (followButton.textContent === "Follow") {
          followButton.textContent = "Unfollow";
          console.log(`Following ${username}`);
          followUser(username).then();
        } else if (followButton.textContent === "Unfollow") {
          followButton.textContent = "Follow";
          console.log(`Unfollowing ${username}`);
          unfollowUser(username).then();
        }
      });
    });
  }


  //for the tweets

  const tweetsContainer = document.querySelector(".feed");

  async function getAllTweets() {
    // const response = await fetch(BASE_URL + '/my_tweets',
    //   {
    //       headers: {
    //           'Content-Type': 'application/json'
    //       }
    //   });
    // const allTweets = await response.json();
    // populateTweets(allTweets);
    //

    const dummyTweets = [
      {
        id: '123',
        userName: 'Professor',
        tweet: 'DO you remember?',
        userImage: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=200'
      },
      {

        id: '233',
        userName: 'Student',
        tweet: 'Umm no.. ',
        userImage: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=200'
      }
    ];
    populateTweets(dummyTweets);
  }

  function populateTweets(allTweets) {
    let tweetSectionTemplate = document.querySelector('.postTemplate');

    allTweets.forEach((tweet) => {
      let tweetSection = tweetSectionTemplate.cloneNode(true);
      tweetSection.classList.remove('d-none');

      tweetSection.querySelector('.tweet_user_image').src = tweet.userImage;
      tweetSection.querySelector('.tweet_username').innerHTML = tweet.userName;
      tweetSection.querySelector('.tweet_para').innerHTML = tweet.tweet;

      tweetsContainer.appendChild(tweetSection);

    });
  }

  getAllTweets().then();

});
