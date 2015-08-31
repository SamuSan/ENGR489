class PerformanceController < ApplicationController
  def index
    text = params["input"] if params["input"]

    respond_to do |format|
      format.js {render inline: "location.reload();", :json => text.to_json }
      format.html
    end
  end

  def stop_performance
    render json: {"stop" => "ok"}
  end
end
