$(function () {
  const displayCurrentDate = () => {
      // Get current date using Day.js and display it
      const currentDate = dayjs().format('MMMM D, YYYY');
      $("#currentDay").text(currentDate);
  };

  const applyColorCode = () => {
      const currentHour = dayjs().hour();  // Get current hour using Day.js

      $(".time-block").each(function () {
          const hour = parseInt($(this).attr("id").split("-")[1]);
          if (hour < currentHour) {
              $(this).addClass("past").removeClass("present future");
          } else if (hour === currentHour) {
              $(this).addClass("present").removeClass("past future");
          } else {
              $(this).addClass("future").removeClass("past present");
          }
      });
  };

  const loadSavedEvents = () => {
      $(".time-block").each(function () {
          const hour = $(this).attr("id");
          const savedEvent = localStorage.getItem(hour);
          if (savedEvent) {
              $(this).find(".description").val(savedEvent);
          }
      });
  };
  // Save to local storage and show text on screen when saveBtn clicked

  $(".saveBtn").on("click", function () {
      const hour = $(this).parent().attr("id");
      const eventText = $(this).siblings(".description").val();
      localStorage.setItem(hour, eventText);
      $("#savedLocal").text("Saved to localStorage !")
      setTimeout(function() {
        $("#savedLocal").text("");
    }, 1000);
  });

  // Initialize functions
  displayCurrentDate();
  applyColorCode();
  loadSavedEvents();
});