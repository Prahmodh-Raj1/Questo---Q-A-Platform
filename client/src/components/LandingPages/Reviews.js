import React from "react";
import Heading from "../../layout/Heading";
import ReviewCard from "../../layout/ReviewCard";
import img1 from "../../assets/images/pic1.png";
import img2 from "../../assets/images/pic2.png";
import img3 from "../../assets/images/pic3.png";

const Reviews = () => {
    let content1 = "I've been using this platform for a few months, and it's become a staple in my tech toolkit. It's great for getting answers to specific questions, and the voting system helps to identify the most reliable responses. Sometimes, it takes a bit of time to receive responses, but overall, it's been a valuable resource for my learning journey."
    let content2 = "As a graduate student, I've found this platform incredibly useful for diving deeper into academic subjects. The community here is well-informed, and I appreciate the quality of discussions. It's become my go-to place for niche research."
    let content3 = "In my field of engineering, this platform is a valuable resource for problem-solving and sharing expertise. The tags and categories make it easy to find relevant information. It's been especially helpful during challenging projects when I need quick advice."
  return (
    <div className=" min-h-[80vh] flex flex-col items-center justify-center md:px-32 px-5">
      <Heading title1="Our" title2="Reviews" />

      <div className=" flex flex-col md:flex-row gap-5 mt-5">
        <ReviewCard img={img1} content = {content1} />
        <ReviewCard img={img2} content={content2}/>
        <ReviewCard img={img3} content = {content3}/>
      </div>
    </div>
  );
};

export default Reviews;