import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { TextField } from "./TextField";
import * as Yup from "yup";
import Select from "./Select";
import axios from "axios";
import { useParams } from "react-router-dom";
export const Formdata = () => {
  const [formValues, setFormValues] = useState(null);
  const params = useParams();
  const [msg, setmsg] = useState("");
  const [disp, setdisp] = useState(true);
  useEffect(() => {
    console.log(params.id);
    const data1 = { id: params.id };
    axios
      .post("http://localhost:5000/find", data1)
      .then((data) => {
        if (data) {
          axios
            .post("http://localhost:5000/getdata", data1)
            .then((data) => {
              console.log(data.data.professionSkills.toString());
              setFormValues({
                TechSkills: data.data.professionSkills.toString(),
                WorkedSkills: data.data.workSkills.toString(),
                Experience: data.data.experience,
                Role: data.data.roles,
                shirtsize: data.data.shirtSize,
                sports: data.data.sports.toString(),
                talents: data.data.talents.toString(),
                foodtype: data.data.foodHabbits,
                worklocation: data.data.worktype,
              });
            })
            .catch((e) => console.log(e));
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  const dropdown = [
    { key: "select an option", value: "" },
    { key: "Veg", value: "veg" },
    { key: "Non-Veg", value: "nonveg" },
  ];
  const dropdown2 = [
    { key: "select an option", value: "" },
    { key: "WorkFromHome", value: "wfh" },
    { key: "WorkFromOffice", value: "wfo" },
    { key: "Hybrid", value: "hybrid" },
  ];
  const initialDetails = {
    TechSkills: "",
    WorkedSkills: "",
    Experience: 0,
    Role: "",
    shirtsize: 0,
    sports: "",
    talents: "",
    foodtype: "",
    worklocation: "",
  };
  const validate = Yup.object({
    TechSkills: Yup.string().required("Required"),
    WorkedSkills: Yup.string().required("Required"),
    Experience: Yup.string().required("Required"),
    Role: Yup.string().required("Required"),
    shirtsize: Yup.string().required("Required"),
    sports: Yup.string().required("Required"),
    talents: Yup.string().required("Required"),
    foodtype: Yup.string().required("Required"),
    worklocation: Yup.string().required("Required"),
  });
  return (
    <>
      <div
        className="alert alert-success alert-dismissible fade show"
        id="alert"
        role="alert"
        style={{ display: disp ? "none" : "block" }}
      >
        {msg}
        <button
          type="button"
          className="close"
          data-dismiss="alert"
          aria-label="Close"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <Formik
        initialValues={formValues || initialDetails}
        validationSchema={validate}
        enableReinitialize
        onSubmit={(values) => {
          let s1 = values.TechSkills.split(",").map((item) => {
            item = item.trim();
            return item.toLocaleLowerCase();
          });
          let s2 = values.WorkedSkills.split(",").map((item) => {
            item = item.trim();
            return item.toLocaleLowerCase();
          });
          let s3 = values.sports.split(",").map((item) => {
            item = item.trim();
            return item.toLocaleLowerCase();
          });
          let s4 = values.talents.split(",").map((item) => {
            item = item.trim();
            return item.toLocaleLowerCase();
          });
          values = {
            ...values,
            TechSkills: s1,
            WorkedSkills: s2,
            sports: s3,
            talents: s4,
          };
          console.log(values);
          values = { ...values, id: params.id };
          axios
            .post("http://localhost:5000/userdata", values)
            .then((data) => {
              setmsg(data.data.message);
            })
            .then((data) => {
              setTimeout(function () {
                setdisp(true);
              }, 10000);
              setdisp(false);
            })
            .catch((err) => {
              console.log("error");
            });
        }}
      >
        {(formik) => (
          <div>
            <h1 className="my-4 font-weight-bold .display-4">
              User Information
            </h1>
            <Form>
              <TextField
                label="Enter Skills You are Confident(Coma Separated Values)"
                name="TechSkills"
                type="text"
              />
              <TextField
                label="Worked Skills(Coma Separated Values)"
                name="WorkedSkills"
                type="text"
              />
              <TextField
                label="Enter Experience(In Years)"
                name="Experience"
                type="number"
              />
              <TextField label="Enter Role" name="Role" type="text" />
              <TextField label="Enter ShirtSize" name="shirtsize" type="text" />
              <TextField
                label="Enter Sports(Coma Separated Values)"
                name="sports"
                type="text"
              />
              <TextField
                label="Enter Talents(Coma Separated Values)"
                name="talents"
                type="text"
              />
              <Select
                label="select Preferred Food Type"
                name="foodtype"
                options={dropdown}
              />
              <Select
                label="Work Location"
                name="worklocation"
                options={dropdown2}
              />
              <button className="btn btn-dark mt-3" type="submit">
                Save
              </button>
              <button className="btn btn-danger mt-3 ml-3" type="reset">
                Reset
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};
