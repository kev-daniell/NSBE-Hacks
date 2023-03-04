package caretaker

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
	MakeCaretaker(w http.ResponseWriter, r *http.Request)
	GetCaretaker(w http.ResponseWriter, r *http.Request)
}

type caretaker struct {
	db *gorm.DB
}

func NewCaretaker(db *gorm.DB) *caretaker {
	return &caretaker{db}
}

func (u *caretaker) MakeCaretaker(w http.ResponseWriter, r *http.Request) {
	var careTaker types.Caretaker
	err := json.NewDecoder(r.Body).Decode(&careTaker)
	if err != nil {
		log.Println("error decoding", err)
		return
	}

	resp := u.db.Create(&careTaker)
	if resp.Error != nil {
		log.Println("error making ", careTaker, resp.Error)
		return
	}

	err = json.NewEncoder(w).Encode(&careTaker)
	if err != nil {
		log.Println("error")
		return
	}
}

func (u *caretaker) GetCaretaker(w http.ResponseWriter, r *http.Request) {
	var usr types.Caretaker

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
