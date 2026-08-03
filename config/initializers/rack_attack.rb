class Rack::Attack
  throttle("otp requests by ip", limit: 5, period: 1.minute) do |req|
    req.ip if req.path == "/api/v1/auth/request_otp" && req.post?
  end
end
