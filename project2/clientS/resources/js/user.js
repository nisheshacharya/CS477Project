
window.onload = (() => {
    const BASE_URL = 'http://localhost:3001';
    const userImage = 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=200'
    const followingContent = document.querySelector("#following")
    const followingbtn = document.querySelector("#followingbtn")


    const token = localStorage.getItem("token")
    const username = localStorage.getItem("username")

    document.getElementById("userName").innerHTML = username


    followingContent.style.display = "none"

    followingbtn.onclick = async function (event) {
        event.preventDefault()
        const response = await fetch(BASE_URL + '/users/userinfo',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        const userResponses = await response.json();
        const followinglist = userResponses.follows.map(u => u.userId).join(", ")
        followingContent.style.display = "block"
        followingContent.innerHTML = followinglist



    }

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




    // search bar

    let searchField = document.querySelector('.searchField');
    let resultsSection = document.querySelector('.searchResults');

    searchField.addEventListener('keyup', function (event) {
        getSearchResults(event.target.value).then(r => {
        });                                                         //(event.target.value gives the value of whatever is pressed after key)
        if (event.target.value === '') {
            searchResultsContainer.innerHTML = ''
        }
    });

    async function getSearchResults(searchKeyword) {

        if (searchKeyword != "") {
            const token = localStorage.getItem("token")

            const response = await fetch(BASE_URL + '/users/search?username=' + searchKeyword,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
            const users = await response.json();
            console.log("users", users)
            populateSearchResults(users);
        }

    }


    function populateSearchResults(filteredResults) {
        searchResultsContainer.innerHTML = '';
        filteredResults.forEach((user) => {
            let username = user.firstname;
            let lastname = user.lastname;

            let isFollowed = user.isFollowed; //For following

            const resultElement = document.createElement("div");
            resultElement.classList.add("searchResult");
            resultElement.textContent = username + " " + lastname;

            const followButton = document.createElement("button");



            followButton.textContent = isFollowed ? "Unfollow" : "Follow";
            followButton.classList.add("followButton");

            followButton.onclick = async function () {
                isFollowed ? unFollow(user._id) : follow(user._id)


            }

            resultElement.appendChild(followButton);
            searchResultsContainer.appendChild(resultElement);

            // Adding event listener to handle follow/unfollow actions

            // In home.js

            // Adding event listener to handle follow/unfollow actions
            followButton.addEventListener("click", async () => {
                try {
                    const response = await fetch(BASE_URL + '/users/follow', {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            followId: user._id, // or the appropriate ID of the user to follow/unfollow

                        })
                    });

                    if (response.ok) {
                        // Toggle the button text and update UI
                        if (followButton.textContent === "Follow") {
                            followButton.textContent = "Unfollow";
                        } else if (followButton.textContent === "Unfollow") {
                            followButton.textContent = "Follow";
                        }
                    } else {
                        console.log("Follow/unfollow request failed");
                    }
                } catch (error) {
                    console.log("Error during follow/unfollow", error);
                }
            });

        });
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



    //for the tweets

    const tweetsContainer = document.querySelector(".feed");

    async function getAllTweets() {



        const response = await fetch(BASE_URL + '/tweets/auth-user',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        const allTweets = await response.json();
        populateTweets(allTweets.tweets);

    }

    function populateTweets(allTweets) {
        let tweetSectionTemplate = document.querySelector('.postTemplate');

        allTweets.forEach((tweet) => {
            let tweetSection = tweetSectionTemplate.cloneNode(true);   //coles the template
            tweetSection.classList.remove('d-none');                   //remove displapay = "none" class

            tweetSection.querySelector('.tweet_user_image').src = userImage;
            tweetSection.querySelector('.tweet_username').innerHTML = tweet.userId.firstname;
            tweetSection.querySelector('.tweet_para').innerHTML = tweet.tweet;

            tweetsContainer.appendChild(tweetSection);

        });
    }

    getAllTweets().then();

    getFollowingList();
    async function getFollowingList() {
        const token = localStorage.getItem("token");

        try {
            const response = await fetch(BASE_URL + '/users/displayFollowing', {  //change to port? 
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const allFollowing = await response.json();
            console.log("followingg", allFollowing);

            let displayF = document.getElementById("displayUserFollowing");
            displayF.innerHTML = ''; // Clear existing content

            for (let i = 0; i < allFollowing.follows.length; i++) {
                displayF.innerHTML += `<div><span>${allFollowing.follows[i].userId}</span> <span>${allFollowing.follows[i].firstname}</span></div>`;
            }
        } catch (error) {
            console.log("Error fetching following list", error);
        }
    }

    async function unfollowUser(userId) {
        console.log("id", userId);
        const token = localStorage.getItem("token")

        const response = await fetch(BASE_URL + '/users/unfollow',
            {
                method: "PUT",
                body: JSON.stringify({
                    unFollowId: userId
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        const result = await response.json();
        console.log("result", result);
        location.reload();
        // allTweetsArr = allTweets.tweets
        //populateTweets(allTweets.tweets);

    }

    // Add an event listener to the log out button
    const logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener("click", () => {
        // Clear the user's session/token from local storage
        localStorage.removeItem("token");
        // Redirect to the login page
        window.location.href = "login.html"; // Change to the actual login page URL
    });






});
