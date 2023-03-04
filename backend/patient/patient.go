package patient

import (
	"encoding/json"
	"github.com/gorilla/mux"
	"github.com/pill-pal/backend/types"
	"gorm.io/gorm"
	"log"
	"net/http"
	"strconv"
)

type ApiService interface {
	MakePatient(w http.ResponseWriter, r *http.Request)
	GetAllPatients(w http.ResponseWriter, r *http.Request)
	GetPatient(w http.ResponseWriter, r *http.Request)
	UpdatePatient(w http.ResponseWriter, r *http.Request)
	DeletePatient(w http.ResponseWriter, r *http.Request)
}

type patient struct {
	db *gorm.DB
}

func NewPatient(db *gorm.DB) *patient {
	return &patient{db}
}

func (u *patient) MakePatient(w http.ResponseWriter, r *http.Request) {
	var patient types.Patient
	err := json.NewDecoder(r.Body).Decode(&patient)
	if err != nil {
		log.Println("error decoding", err)
		return
	}

	resp := u.db.Create(&patient)
	if resp.Error != nil {
		log.Println("error making ", patient, resp.Error)
		return
	}

	err = json.NewEncoder(w).Encode(&patient)
	if err != nil {
		log.Println("error")
		return
	}

}

func (u *patient) GetAllPatients(w http.ResponseWriter, r *http.Request) {
	var patients []types.Patient

	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		log.Println("id is missing in GetUser")
		log.Println(err)
		w.WriteHeader(404)
	}

	u.db.Where("caretaker_id = ?", id).Find(&patients)
	err = json.NewEncoder(w).Encode(&patients)
	if err != nil {
		return
	}
}

func (u *patient) GetPatient(w http.ResponseWriter, r *http.Request) {
	var (
		usr types.Patient
	)

	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		log.Println("id is missing in GetUser")
		log.Println(err)
		w.WriteHeader(404)
	}

	resp := u.db.First(&usr, id)
	if resp.Error != nil {
		log.Println(resp.Error)
		w.WriteHeader(500)
	}

	err = json.NewEncoder(w).Encode(&usr)
	if err != nil {
		return
	}
}

func (u *patient) UpdatePatient(w http.ResponseWriter, r *http.Request) {
	var (
		newUser types.Patient
		oldUser types.Patient
	)

	err := json.NewDecoder(r.Body).Decode(&newUser)
	if err != nil {
		log.Println("error occurred decoding", err)
		return
	}

	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		log.Println("id is missing in GetUser")
		log.Println(err)
		w.WriteHeader(404)
	}

	resp := u.db.First(&oldUser, id)
	if resp.Error != nil {
		log.Println(resp.Error)
		w.WriteHeader(500)
	}

	resp = u.db.Model(&oldUser).Updates(newUser)
	if resp.Error != nil {
		log.Println("error occurred creating", resp.Error)
	}

	err = json.NewEncoder(w).Encode(&newUser)
	if err != nil {
		return
	}

}

func (u *patient) DeletePatient(w http.ResponseWriter, r *http.Request) {
	var patientToDelete types.Patient

	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		log.Println("id is missing in GetUser")
		log.Println(err)
		w.WriteHeader(404)
		return
	}

	resp := u.db.First(&patientToDelete, id)
	if resp.Error != nil {
		log.Println(resp.Error)
		w.WriteHeader(500)
		return
	}

	resp = u.db.Delete(&patientToDelete)
	if resp.Error != nil {
		log.Println(resp.Error)
		w.WriteHeader(500)
		return
	}

	err = json.NewEncoder(w).Encode(&patientToDelete)
	if err != nil {
		return
	}
}
