import styled from "styled-components";

const CalendarWrapper = styled.div`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  cursor: pointer;
  height: ${(props) => (props.isOnVerySmallScreen ? "85vh" : "92vh")};
  overflow-y: auto;
  .rbc-calendar {
    color: ${(props) => (props.userTheme ? "#fff" : "#000")};
  }

  .rbc-current-time-indicator {
    position: absolute;
    z-index: 3;
    height: 0.15rem;
    background-color: #fe7576;
    pointer-events: none;
  }

  .rbc-today {
    color: ${(props) => (props.userTheme ? "#fff" : "#000")};
    background-color: ${(props) =>
      props.userTheme
        ? "rgba(39, 192, 255, 0.075)"
        : "rgba(39, 192, 255, 0.15)"};
  }

  .rbc-header {
    border-bottom: 0.75px solid
      ${(props) =>
        props.userTheme ? "rgba(255, 255, 255, 0.2)" : "rgba(66, 66, 66, 0.5)"};
  }

  .rbc-header + .rbc-header {
    border-left: 0.75px solid
      ${(props) =>
        props.userTheme ? "rgba(255, 255, 255, 0.2)" : "rgba(66, 66, 66, 0.5)"};
  }

  .rbc-day-bg + .rbc-day-bg {
    border-left: 0.75px solid
      ${(props) =>
        props.userTheme ? "rgba(255, 255, 255, 0.2)" : "rgba(66, 66, 66, 0.5)"};
  }

  .rbc-timeslot-group {
    border-bottom: 0.75px solid
      ${(props) =>
        props.userTheme ? "rgba(255, 255, 255, 0.2)" : "rgba(66, 66, 66, 0.5)"};
    min-height: 120px !important;
  }

  .rbc-time-view {
    border: 0.75px solid
      ${(props) =>
        props.userTheme ? "rgba(255, 255, 255, 0.2)" : "rgba(66, 66, 66, 0.5)"};
  }

  .rbc-time-content {
    border-top: 0.75px solid
      ${(props) =>
        props.userTheme ? "rgba(255, 255, 255, 0.2)" : "rgba(66, 66, 66, 0.5)"};
  }

  .rbc-time-content > * + * > * {
    border-left: 0.75px solid
      ${(props) =>
        props.userTheme ? "rgba(255, 255, 255, 0.2)" : "rgba(66, 66, 66, 0.5)"};
  }

  .rbc-time-header-content {
    border-left: 0.75px solid
      ${(props) =>
        props.userTheme ? "rgba(255, 255, 255, 0.2)" : "rgba(66, 66, 66, 0.5)"};
  }

  .rbc-day-slot .rbc-time-slot {
    border: 0.1px solid
      ${(props) =>
        props.userTheme
          ? "rgba(255, 255, 255, 0.025)"
          : "rgba(66, 66, 66, 0.05)"};
  }
`;

export default CalendarWrapper;
