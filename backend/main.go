package main

import (
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/pill-pal/backend/caretaker"
	"github.com/pill-pal/backend/patient"
	"github.com/pill-pal/backend/schedule"
	"github.com/pill-pal/backend/types"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"net/http"
	"os"
	"strconv"
)

func main() {
	var (
		err error
		db  *gorm.DB
	)

	host := os.Getenv("HOST")
	dbPort, err := strconv.Atoi(os.Getenv("DBPORT"))
	if err != nil {
		panic(err)
	}
	user := os.Getenv("USER")
	dbname := os.Getenv("NAME")
	dbpassword := os.Getenv("PASSWORD")

	// Database connection string
	dsn := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%v sslmode=disable", host, user, dbpassword, dbname, dbPort)

	// Opening connection to database
	fmt.Println("dialect:", dsn)
	db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	fmt.Println("Connected to DB")

	err = db.AutoMigrate(&types.Caretaker{})
	if err != nil {
		return
	}
	err = db.AutoMigrate(&types.Patient{})
	if err != nil {
		return
	}
	err = db.AutoMigrate(&types.Schedule{})

	router := mux.NewRouter()

	patientHandler := patient.NewPatient(db)
	caretakerHandler := caretaker.NewCaretaker(db)
	scheduleHandler := schedule.NewSchedule(db)

	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		err := json.NewEncoder(w).Encode("Hi Mom")
		if err != nil {
			return
		}
	})

	// patients:
	router.HandleFunc("/patient", patientHandler.MakePatient).Methods(http.MethodPost)
	// all patients under a caretaker (id => caretaker_id)
	router.HandleFunc("/patient/all/{id}", patientHandler.GetAllPatients).Methods(http.MethodGet)
	router.HandleFunc("/patient/{id}", patientHandler.GetPatient).Methods(http.MethodGet)
	router.HandleFunc("/patient/{id}", patientHandler.UpdatePatient).Methods(http.MethodPatch)
	router.HandleFunc("/patient/{id}", patientHandler.DeletePatient).Methods(http.MethodDelete)

	// caretaker:
	router.HandleFunc("/caretaker", caretakerHandler.MakeCaretaker).Methods(http.MethodPost)
	router.HandleFunc("/caretaker/{id}", caretakerHandler.GetCaretaker).Methods(http.MethodGet)

	// schedules:
	router.HandleFunc("/schedule", scheduleHandler.MakeSchedule).Methods(http.MethodPost)
	// all schedules for a certain patient (id => patient_id)
	router.HandleFunc("/schedule/all/{id}", scheduleHandler.GetAllSchedules).Methods(http.MethodGet)
	router.HandleFunc("/schedule/{id}", scheduleHandler.GetSchedule).Methods(http.MethodGet)
	router.HandleFunc("/schedule/{id}", scheduleHandler.UpdateSchedule).Methods(http.MethodPatch)
	router.HandleFunc("/schedule/{id}", scheduleHandler.DeleteSchedule).Methods(http.MethodDelete)

	err = http.ListenAndServe(":8080", router)
	if err != nil {
		return
	}
}
