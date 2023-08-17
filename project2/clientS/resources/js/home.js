window.onload = (() => {
    const BASE_URL = 'http://localhost:3001';

    const userImage = 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=200'


    const tweetsContainer = document.querySelector(".feed");

    const searchResultsContainer = document.querySelector(".searchResults");

    //post tweet
    const form = document.getElementById("tweetForm")
    form.addEventListener("submit", async function (event) {

        event.preventDefault()
        const token = localStorage.getItem("token")  //saved in local storage while login
        await fetch(BASE_URL + '/tweets', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ tweet: form.elements.tweet.value })
        })

        location.reload()


    })

    let allTweetsArr = []

    async function getAllTweets() {
        const token = localStorage.getItem("token")

        const response = await fetch(BASE_URL + '/tweets',
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        const allTweets = await response.json();
        allTweetsArr = allTweets.tweets
        populateTweets(allTweets.tweets);

        const dummyTweets = [
            {
                id: '123',
                userName: 'Professor',
                tweet: 'Practice! Practice!!',
                userImage: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=200'
            },
            {

                id: '233',
                userName: 'Adisu',
                tweet: 'Yes',
                userImage: 'https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=200'
            }
        ];

    }

    let itemsToShow = 5; // Number of items to show initially
    let itemsLoaded = 0;

    function populateTweets(allTweets) {

        let tweetSectionTemplate = document.querySelector('.postTemplate');
        for (let i = itemsLoaded; i < itemsLoaded + itemsToShow; i++) {
            const tweet = allTweets[i]
            console.log("tweet", tweet)


            let tweetSection = tweetSectionTemplate.cloneNode(true); // cloning
            tweetSection.classList.remove('d-none'); //remove display none of cloned one

            tweetSection.querySelector('.tweet_user_image').src = userImage;
            tweetSection.querySelector('.tweet_username').innerHTML = tweet.userId.firstname;
            tweetSection.querySelector('.tweet_para').innerHTML = tweet.tweet;
            tweetSection.querySelector('.tweet_date').innerHTML = new Date(tweet.postedDate).toLocaleString();

            tweetsContainer.appendChild(tweetSection);

        };
        itemsLoaded += itemsToShow;

    }

    getAllTweets().then();   // innitial call

    window.addEventListener("scroll", () => {
        console.log("Scroll",)
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.scrollY;

        console.log("Scroll", windowHeight + scrollTop, "height", documentHeight)

        if (windowHeight + scrollTop + 5 >= documentHeight) {      // if  are scrolled to the bottom
            populateTweets(allTweetsArr);
        }
    });



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


    //follow
    async function follow(followId) {
        console.log("follow called")
        const token = localStorage.getItem("token")
        const response = await fetch(BASE_URL + '/users/follow',
            {
                method: "PUT",
                body: JSON.stringify({ followId }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        const users = await response.json();
        console.log("followed", users)
        location.reload()

    }

    async function unFollow(unFollowId) {
        console.log("unfollow called")
        const token = localStorage.getItem("token")
        const response = await fetch(BASE_URL + '/users/unfollow',
            {
                method: "PUT",
                body: JSON.stringify({ unFollowId }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
        const users = await response.json();
        console.log("un-followed", users)
        location.reload()

    }

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
    //logout
    // Add an event listener to the log out button
    const logoutButton = document.getElementById("logoutButton");
    logoutButton.addEventListener("click", () => {
        // Clear the user's session/token from local storage
        localStorage.removeItem("token");
        // Redirect to the login page
        window.location.href = "login.html"; // Change to the actual login page URL
    });



});
