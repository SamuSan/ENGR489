class PerformanceController < ApplicationController
  def index
  end

  def stop_performance
    render json: {"stop" => "ok"}
  end
end
