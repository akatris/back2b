module SessionsHelper
  def log_in(user)
    session[:user_id] = user.id
  end

  def log_out
    if logged_in?
      session.delete :user_id
      current_user = nil
    end
  end

  def current_user
    @current_user ||= User.find_by(id: session[:user_id])
  end

  def logged_in?
    !current_user.nil?
  end

  def account_owner?(user)
    current_user.id == user.id
  end

  def admin?
    logged_in? && current_user.admin?
  end

  def own_account?(user)
    current_user.id == user.id
  end
end
