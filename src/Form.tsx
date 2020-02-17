import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FormErrors } from "./FormErrors";

const MINIMUM_YEAR = new Date().getFullYear() - 18;
const TODAY = new Date();
const MINIMUM_BIRTHDAY = TODAY.setFullYear(MINIMUM_YEAR);

interface IState {
  // Form info
  contact: {
    mobile: string;
    work: string;
    home: string;
  };
  dob: Date | null;
  gender: string;
  guardian: {
    name: string;
    contact: string;
    consent: boolean;
  };
  name: string;
  // Errors
  formErrors: {
    name: string;
    date: string;
  };
  formValid: boolean;
  nameValid: boolean;
  dateValid: boolean;
}

interface IProps {
  formSchema?: {
    [key: string]: boolean;
  };
}

export class Form extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      // Form info
      contact: {
        mobile: "",
        work: "",
        home: ""
      },
      dob: new Date(),
      gender: "undefined",
      guardian: {
        name: "",
        contact: "",
        consent: true
      },
      name: "",
      // Errors
      formErrors: {
        name: "",
        date: ""
      },
      formValid: false,
      nameValid: false,
      dateValid: false
    };
    if (this.props.formSchema) {
      // dynamically add to state
      Object.keys(this.props.formSchema).forEach(prop => {
        (this.state as any)[prop] = "";
      });
    }
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    const returnedObj: any = {};
    Object.entries(this.state).forEach(([key, value]) => {
      returnedObj[key] = JSON.stringify(value);
    });
    // return the form object, in real life would send to a server here
    return returnedObj;
  };

  validateField(fieldName: string, value: any) {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let dateValid = this.state.dateValid;

    switch (fieldName) {
      case "name":
        nameValid = /\w+ \w+/i.test(value);
        fieldValidationErrors.name = nameValid ? "" : "is invalid";
        break;
      case "date":
        dateValid = value.valueOf() < MINIMUM_BIRTHDAY;
        fieldValidationErrors.date = dateValid ? "" : "is not old enough";
        break;
      default:
        break;
    }
    this.setState(
      {
        formErrors: fieldValidationErrors,
        nameValid,
        dateValid
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({ formValid: this.state.nameValid && this.state.dateValid });
  }

  render() {
    const { formSchema } = this.props;
    const {
      contact,
      dob,
      formValid,
      gender,
      name,
      guardian,
      formErrors
    } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={"container"}>
        {formSchema &&
          Object.keys(formSchema).map(propName => {
            return (
              <label className={"children"} key={propName}>
                {propName}
                <input
                  type="text"
                  value={(this.state as any)[propName]}
                  onChange={event => {
                    const propValue = event.target.value;
                    this.setState(prevState => {
                      return {
                        ...prevState,
                        [propName]: propValue
                      };
                    });
                  }}
                />
              </label>
            );
          })}
        <label className={"children"}>
          Name:
          <input
            type="text"
            value={name}
            onChange={event => {
              const value = event.target.value;
              this.setState({ name: value }, () => {
                this.validateField("name", value);
              });
            }}
          />
        </label>

        <label className={"children"}>
          Date of birth:
          <DatePicker
            selected={dob}
            onChange={date => {
              this.setState({ dob: date }, () => {
                this.validateField("date", date);
              });
            }}
            dateFormat="MMMM d, yyyy"
          />
        </label>

        <label className={"children"}>
          Gender:
          <select
            value={gender}
            onChange={event => {
              this.setState({ gender: event.target.value });
            }}
          >
            <option value="M">M</option>
            <option value="F">F</option>
            <option value="undefined">Rather not say</option>
          </select>
        </label>

        <div className={"children"}>
          <label>
            Contact Mobile:
            <input
              type="text"
              value={contact.mobile}
              onChange={event => {
                const value = event.target.value;
                this.setState(prevState => ({
                  ...prevState,
                  contact: {
                    ...prevState.contact,
                    mobile: value
                  }
                }));
              }}
            />
          </label>
          <label>
            Contact Work:
            <input
              type="text"
              value={contact.work}
              onChange={event => {
                const value = event.target.value;
                this.setState(prevState => ({
                  ...prevState,
                  contact: {
                    ...prevState.contact,
                    work: value
                  }
                }));
              }}
            />
          </label>
          <label>
            Contact Home:
            <input
              type="text"
              value={contact.home}
              onChange={event => {
                const value = event.target.value;
                this.setState(prevState => ({
                  ...prevState,
                  contact: {
                    ...prevState.contact,
                    home: value
                  }
                }));
              }}
            />
          </label>
        </div>

        <label className={"children"}>
          Require Guardian consent:
          <input
            type="checkbox"
            checked={guardian.consent}
            onChange={event => {
              const checked = event.target.checked;
              this.setState(prevState => ({
                ...prevState,
                guardian: {
                  ...prevState.guardian,
                  consent: checked
                }
              }));
            }}
          />
        </label>

        <div className={"children"}>
          <label>
            Guardian Name:
            <input
              type="text"
              value={guardian.name}
              onChange={event => {
                this.setState(prevState => ({
                  ...prevState,
                  guardian: {
                    ...prevState.guardian,
                    name: event.target.value
                  }
                }));
              }}
            />
          </label>
          <label>
            Guardian Contact:
            <input
              type="text"
              value={guardian.contact}
              onChange={event => {
                this.setState(prevState => ({
                  ...prevState,
                  guardian: {
                    ...prevState.guardian,
                    contact: event.target.value
                  }
                }));
              }}
            />
          </label>
        </div>

        <FormErrors formErrors={formErrors} />
        <input type="submit" value="Submit" disabled={!formValid} />
      </form>
    );
  }
}
