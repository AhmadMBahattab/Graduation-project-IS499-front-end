import React, { Component } from "react";
import "../../styles/projectInfo.css";
const ProjectInfo = () => {
  return (
    <div className="project-info-container">
      <h1>Introduction:</h1>
      <br />
      <p>
        {" "}
        In our society especially in Saudi Arabia usually in vacations or
        weekends times we want gather in chalets or rest houses, in the past
        when we want to rent one of these places we ask someone we know if they
        know a good place or we go looking by our self, but both ways may takes
        time, even though with google maps or Instagram, sometime it’s difficult
        to get information about these places.
      </p>
      <img src={require(`../../Photos/img4.png`).default} alt="chalet" />
      <br />
      <br />
      <p>
        {" "}
        recently there are many applications and websites provide multiple
        services that make our lives easier like when we want order food there
        are food delivery applications that provide lots of different
        restaurants in one place, so we don’t have to go directly into the
        restaurant or looking for restaurants phone numbers, shopping
        applications which allow us to find the products we want fast and order
        it, also, that save a lot of times rather than going to malls or
        markets.
      </p>
      <p>
        {" "}
        social media applications which make communications among us faster or
        even with people in other countries, E-commerce websites which allow
        people to earn money from their home, education websites that allow
        students to improve their knowledge and skills, also allow them to
        communicate with their teachers directly.
      </p>
      <p>
        {" "}
        all the examples that mentions are international websites which used in
        all countries, so we want to come up with idea that will be good for our
        society, so we thought about chalets which our people like to gather in
        it and how people usually looking for it, so we decide to work on
        website will allow users to find perfect chalets or rest houses for
        them, the applications and website that similar to our project some of
        it are general and don’t focus on one real estate, and some of it don’t
        satisfy all users need, so our idea will try to serve the largest amount
        of users by providing a lot of Chalets and rest houses for daily rent or
        long-term rental in one place and will contain necessary information
        about the place such as photos, location, Chalets or rest houses
        description, prices and rental period, and every chalet and rest houses
        will have owner contact information and reservation option from the
        website.
      </p>
      <h1>Objectives and motivations:</h1>
      <br />
      <p>
        The main objective is gathering the Chalets and rest houses owners and
        the potential clients in one website, that will save users time of
        looking for the appropriate Chalets by themselves or asking people, also
        Chalets and rest houses owners will reach to more clients. What
        motivated us that as families or friends we have difficulty when we want
        rent one of these places, we usually wasting a lot of time searching on
        the right place by using Instagram or google maps or even the
        traditional ways like going outside and looking by ourself, but yet
        these ways aren’t effective sometimes, so we want to implement solution
        that will help us as individual or group choosing appropriate place in
        efficient way, and also what motivated us that we know some of owners
        have problems like lack of clients so this project will help them to
        promote their places.
      </p>
    </div>
  );
};

export default ProjectInfo;
