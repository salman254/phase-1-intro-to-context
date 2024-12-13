// Function to create an employee record from an array
function createEmployeeRecord(array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Function to create an array of employee records from an array of arrays
  function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
  }
  
  // Function to add a timeIn event to an employee's record
  function createTimeInEvent(employeeRecord, dateTime) {
    const [date, hour] = dateTime.split(' ');
    const timeInEvent = {
      type: "TimeIn",
      date,
      hour: parseInt(hour, 10)
    };
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
  }
  
  // Function to add a timeOut event to an employee's record
  function createTimeOutEvent(employeeRecord, dateTime) {
    const [date, hour] = dateTime.split(' ');
    const timeOutEvent = {
      type: "TimeOut",
      date,
      hour: parseInt(hour, 10)
    };
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;
  }
  
  // Function to calculate the hours worked on a specific date
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
  }
  
  // Function to calculate the wages earned on a specific date
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const wage = employeeRecord.payPerHour * hoursWorked;
    return wage;
  }
  
  // Function to aggregate all wages earned by an employee
  function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => {
      return total + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
    return totalWages;
  }
  
  // Function to calculate the total payroll for all employees
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, record) => {
      return total + allWagesFor(record);
    }, 0);
  }
  
  
  
  