class JointController < ApplicationController

  def index
   @item ={name:"メルカリさん",price:"1,500"}
   @categoly="レディース"
   @categolies=["レディース","メンズ","家電・スマホ・カメラ","おもちゃ・ホビー・グッズ"]
  end
end