/* 
create_subscription($data, $expiry_days = 30)

	// [Abstraction] - adds a basic subscription
  public function add_basic_subscription($user_id, $expiry_days = 30)
  
  // Get subscriptions
  public function get_subscriptions($filters = NULL)
  
  // Get latest subscription belonging to the user specified
  public function get_latest_user_subscription
  
  // User subscription has expired
  public function user_subscription_expired($user_id)
  
  
	// Update subscription
  public function update_subscription($subscription_id, $data)
  
  // Get the number of days left for a subscription
  public function get_days_left($start_date, $end_date) 
  
  // Returns true if expired, false if not
	public function subscription_has_expired($expiry_date)
*/
