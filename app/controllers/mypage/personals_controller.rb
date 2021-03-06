class Mypage::PersonalsController < ApplicationController
  # ログインしていない場合ログインページへ移動する
  before_action :authenticate_user!
  # ユーザープロフィール情報を取得する
  before_action :get_personal, only:[:edit, :update]

  def edit
  end

  def update
    if @personal.update(profile_param)
      redirect_to(mypage_path, notice: "本人情報を登録しました")
    else
      flash[:alert] = '入力内容に不備があります'
      render :edit
    end
  end

  private
  def profile_param
    params.require(:personal).permit(:zip_code, :prefecture_id, :city, :address, :building)
  end
  def get_personal
    @personal = current_user.personal
  end
end
