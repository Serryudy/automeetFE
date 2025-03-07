import { useState, useEffect, useRef } from "react"
import { 
  Form, Button, InputGroup, FormControl, Dropdown, ListGroup, Card, Modal 
} from "react-bootstrap"
import Calendar from "react-calendar"
import "bootstrap/dist/css/bootstrap.min.css"
import "react-calendar/dist/Calendar.css"
import { FaCalendarAlt, FaSearch, FaChevronDown, FaCheckCircle } from "react-icons/fa"

const RoundRobinForm = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showCalendar, setShowCalendar] = useState(false)
  const [startTime, setStartTime] = useState("09:00 AM")
  const [endTime, setEndTime] = useState("10:00 AM")
  const [timeSlots, setTimeSlots] = useState([])
  const [timeError, setTimeError] = useState('')
  const [participants, setParticipants] = useState([
    { id: 1, name: "John Doe", group: "Group name if any" }
  ])
  const [searchContact, setSearchContact] = useState("")
  const [hosts, setHosts] = useState([
    { id: 1, name: "Organizer User", group: "Organizers" }
  ])
  const [searchHost, setSearchHost] = useState("")
  const [showStartTimeDropdown, setShowStartTimeDropdown] = useState(false)
  const [showEndTimeDropdown, setShowEndTimeDropdown] = useState(false)

  const startTimeRef = useRef(null)
  const endTimeRef = useRef(null)

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setShowCalendar(false)
  }

  const generateTimeOptions = () => {
    const times = []
    let hour = 12
    let period = "AM"

    for (let i = 0; i < 24; i++) {
      times.push(`${hour}:00 ${period}`)
      hour = hour === 12 ? 1 : hour + 1
      if (hour === 12) period = period === "AM" ? "PM" : "AM"
    }
    return times
  }

  const handleAddTimeSlot = () => {
    setTimeError("")

    if (endTime === startTime) {
      setTimeError("End time must be later than start time")
      return
    }

    const newTimeSlot = { id: Date.now(), start: startTime, end: endTime }
    const isDuplicate = timeSlots.some(
      (slot) => slot.start === newTimeSlot.start && slot.end === newTimeSlot.end
    )

    if (isDuplicate) {
      setTimeError("This time slot has already been added")
      return
    }

    setTimeSlots([...timeSlots, newTimeSlot])
  }

  const handleRemoveParticipant = (id) => {
    setParticipants(participants.filter((p) => p.id !== id))
  }

  const handleRemoveHost = (id) => {
    setHosts(hosts.filter((h) => h.id !== id))
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4 fw-bold">Create Round Robin Meeting</h2>

      <Form>
        {currentStep === 1 && (
          <>
            {/* Title */}
            <Form.Group className="mb-4">
              <Form.Label>Title</Form.Label>
              <FormControl type="text" placeholder="John Doe" />
            </Form.Group>

            {/* Date Picker */}
            <Form.Group className="mb-4">
              <Form.Label>Date & Time Range</Form.Label>
              <InputGroup>
                <Button variant="outline-secondary" onClick={() => setShowCalendar(!showCalendar)}>
                  <FaCalendarAlt />
                </Button>
                <FormControl value={selectedDate.toDateString()} readOnly />
              </InputGroup>
              {showCalendar && (
                <div className="mt-2">
                  <Calendar onChange={handleDateSelect} value={selectedDate} />
                </div>
              )}
            </Form.Group>

            {/* Time Picker */}
            <Form.Group className="mb-4">
              <Form.Label>Time Slot</Form.Label>
              <div className="d-flex gap-3">
                <Dropdown show={showStartTimeDropdown} onToggle={() => setShowStartTimeDropdown(!showStartTimeDropdown)}>
                  <Dropdown.Toggle variant="outline-secondary">{startTime}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    {generateTimeOptions().map((time) => (
                      <Dropdown.Item key={time} onClick={() => setStartTime(time)}>
                        {time}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>

                <Dropdown show={showEndTimeDropdown} onToggle={() => setShowEndTimeDropdown(!showEndTimeDropdown)}>
                  <Dropdown.Toggle variant="outline-secondary">{endTime}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    {generateTimeOptions().map((time) => (
                      <Dropdown.Item key={time} onClick={() => setEndTime(time)}>
                        {time}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>

                <Button onClick={handleAddTimeSlot} variant="primary">
                  <FaCheckCircle />
                </Button>
              </div>

              {timeError && <div className="text-danger mt-2">{timeError}</div>}

              {timeSlots.length > 0 && (
                <ListGroup className="mt-3">
                  {timeSlots.map((slot) => (
                    <ListGroup.Item key={slot.id} className="d-flex justify-content-between">
                      {slot.start} - {slot.end}
                      <Button size="sm" variant="outline-danger" onClick={() => setTimeSlots(timeSlots.filter((s) => s.id !== slot.id))}>
                        &times;
                      </Button>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </Form.Group>
          </>
        )}

        {currentStep === 2 && (
          <>
            {/* Participants */}
            <Form.Group className="mb-4">
              <Form.Label>Add Participants</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <FormControl
                  type="text"
                  placeholder="Search by contact"
                  value={searchContact}
                  onChange={(e) => setSearchContact(e.target.value)}
                />
              </InputGroup>

              {participants.map((participant) => (
                <Card key={participant.id} className="mt-2">
                  <Card.Body className="d-flex justify-content-between">
                    {participant.name}
                    <Button variant="outline-danger" size="sm" onClick={() => handleRemoveParticipant(participant.id)}>
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </Form.Group>

            {/* Hosts */}
            <Form.Group className="mb-4">
              <Form.Label>Add Hosts</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
                <FormControl
                  type="text"
                  placeholder="Search by host"
                  value={searchHost}
                  onChange={(e) => setSearchHost(e.target.value)}
                />
              </InputGroup>

              {hosts.map((host) => (
                <Card key={host.id} className="mt-2">
                  <Card.Body className="d-flex justify-content-between">
                    {host.name}
                    <Button variant="outline-danger" size="sm" onClick={() => handleRemoveHost(host.id)}>
                      Remove
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </Form.Group>
          </>
        )}

        <Button variant="primary" onClick={handleNext}>Next</Button>
      </Form>
    </div>
  )
}

export default RoundRobinForm
