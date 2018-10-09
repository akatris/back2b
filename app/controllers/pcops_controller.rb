class PcopsController < ApplicationController
  # display a list of pcop entities
  def index
    @categories = Pcop::Category.all
    respond_to do |format|
      format.html
      format.json { render json: @categories }
    end
  end

  def new
    @pcop_form = Pcop::Form.new
  end

  def edit
    type = Pcop::type params[:id]
    pcop = type.find params[:id]
    if is_rubric?(pcop)
      @pcop_form = Pcop::Form.new(id: pcop.id, name: pcop.name,
        description: pcop.description,
        eligible_transactions: pcop.eligible_transactions)
    else
      @pcop_form = Pcop::Form.new(id: pcop.id, name: pcop.name, description: pcop.description)
    end
  end

  def create
    @pcop_form = Pcop::Form.new pcop_params
    if @pcop_form.valid?
      @pcop_form.save_based_on_id
      redirect_to pcops_path
    else
      render 'pcops/new'
    end
  end


  def update
    type = Pcop::type params[:id]
    pcop = type.find params[:id]
    if is_rubric?(pcop)
      @pcop_form = Pcop::Form.new(id: pcop.id, name: pcop.name,
        description: pcop.description,
        eligible_transactions: pcop.eligible_transactions)
    else
      @pcop_form = Pcop::Form.new(id: pcop.id, name: pcop.name, description: pcop.description)
    end
    if @pcop_form.update_attribues_based_on_id pcop_update_params
      redirect_to pcops_path
    else
      render 'pcops/edit'
    end
  end

  def destroy
    type = Pcop::type params[:id]
    pcop = type.find params[:id]
    pcop.destroy
    redirect_to pcops_path
  end

  private
    def pcop_params
      params.require(:pcop_form)
        .permit(:id, :name, :description, :eligible_transactions)
    end

    def pcop_update_params
      params.require(:pcop_form)
        .permit(:name, :description, :eligible_transactions)
    end
end
