class NodeController < ApplicationController
  before_filter :is_admin



  def index
    @nodes = Node.paginate(page: params[:page])

    respond_to do |format|
      format.html
      format.json { render :json => @nodes}
    end
  end

  def new
  end

  def edit
  end

  def update
    @node = Node.find(params[:id])

    if @node.update_attributes(params[:node])
      flash[:success] = "Node upated"
      redirect_to @node
    else
      render 'edit'
    end
  end

  def destroy
    Node.find(params[:id]).destroy
    flash[:success] = 'Node destroyed'
    redirect_to node_path
  end
end
