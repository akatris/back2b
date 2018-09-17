class PcopsController < ApplicationController
  # display a list of pcop entities
  def index
    @categories = Pcop::Category.all
  end

  def new
    @pcop_form = Pcop::Form.new
  end

  # TODO: wait for https://github.com/rails/rails/issues/33887 to be fixed.
  def create
    @pcop_form = Pcop::Form.new pcop_params
    if @pcop_form.valid?
      @pcop_form.save_based_on_id
      redirect_to pcops_path
    else
      render 'pcops/new'
    end
  end

  private
    def pcop_params
      params.require(:pcop_form)
        .permit(:id, :name, :description, :eligible_transactions)
    end
end
