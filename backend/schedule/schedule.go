package schedule

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
	MakeSchedule(w http.ResponseWriter, r *http.Request)
	GetAllSchedules(w http.ResponseWriter, r *http.Request)
	GetSchedule(w http.ResponseWriter, r *http.Request)
	UpdateSchedule(w http.ResponseWriter, r *http.Request)
	DeleteSchedule(w http.ResponseWriter, r *http.Request)
}

type schedule struct {
	db *gorm.DB
}

func NewSchedule(db *gorm.DB) *schedule {
	return &schedule{db}
}

func (u *schedule) MakeSchedule(w http.ResponseWriter, r *http.Request) {
	var schedule types.Schedule
	err := json.NewDecoder(r.Body).Decode(&schedule)
	if err != nil {
		log.Println("error decoding", err)
		return
	}

	resp := u.db.Create(&schedule)
	if resp.Error != nil {
		log.Println("error making ", schedule, resp.Error)
		return
	}

	err = json.NewEncoder(w).Encode(&schedule)
	if err != nil {
		log.Println("error")
		return
	}
}

func (u *schedule) GetAllSchedules(w http.ResponseWriter, r *http.Request) {
	var schedules []types.Schedule

	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		log.Println("id is missing in GetUser")
		log.Println(err)
		w.WriteHeader(404)
	}

	resp := u.db.Where("patient_id = ?", id).Find(&schedules)
	if resp.Error != nil {
		log.Println(resp.Error)
		w.WriteHeader(500)
	}

	err = json.NewEncoder(w).Encode(&schedules)
	if err != nil {
		return
	}
}

func (u *schedule) GetSchedule(w http.ResponseWriter, r *http.Request) {
	var (
		schedule types.Schedule
	)

	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		log.Println("id is missing in GetUser")
		log.Println(err)
		w.WriteHeader(404)
	}

	resp := u.db.First(&schedule, id)
	if resp.Error != nil {
		log.Println(resp.Error)
		w.WriteHeader(500)
	}

	err = json.NewEncoder(w).Encode(&schedule)
	if err != nil {
		return
	}
}

func (u *schedule) UpdateSchedule(w http.ResponseWriter, r *http.Request) {
	var (
		newSchedule types.Schedule
		oldSchedule types.Schedule
	)

	err := json.NewDecoder(r.Body).Decode(&newSchedule)
	if err != nil {
		log.Println("error occurred decoding", err)
		return
	}

	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		log.Println("id is missing in GetSchedule")
		log.Println(err)
		w.WriteHeader(404)
	}

	resp := u.db.First(&oldSchedule, id)
	if resp.Error != nil {
		log.Println(resp.Error)
		w.WriteHeader(500)
	}

	resp = u.db.Model(&oldSchedule).Updates(newSchedule)
	if resp.Error != nil {
		log.Println("error occurred creating", resp.Error)
	}

	err = json.NewEncoder(w).Encode(&newSchedule)
	if err != nil {
		return
	}
}

func (u *schedule) DeleteSchedule(w http.ResponseWriter, r *http.Request) {
	var scheduleToDelete types.Schedule

	vars := mux.Vars(r)
	id, err := strconv.Atoi(vars["id"])
	if err != nil {
		log.Println("id is missing in GetUser")
		log.Println(err)
		w.WriteHeader(404)
		return
	}

	resp := u.db.First(&scheduleToDelete, id)
	if resp.Error != nil {
		log.Println(resp.Error)
		w.WriteHeader(500)
		return
	}

	resp = u.db.Delete(&scheduleToDelete)
	if resp.Error != nil {
		log.Println(resp.Error)
		w.WriteHeader(500)
		return
	}

	err = json.NewEncoder(w).Encode(&scheduleToDelete)
	if err != nil {
		return
	}
}
