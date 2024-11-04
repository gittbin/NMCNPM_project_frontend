import React from "react";
import { useAuth } from "../../components/introduce/useAuth";
import Sales_daily from "./sale_daily"
import Useronline from "./useronlinecard"
// src/index.js hoặc src/App.js
// import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./x1.css";
function Home() {
  const { user, logout } = useAuth();
  const data = [
    { name: "Jan", Subscribers: 270, "New Visitors": 150, "Active Users": 542 },
    { name: "Feb", Subscribers: 310, "New Visitors": 180, "Active Users": 520 },
    { name: "Mar", Subscribers: 350, "New Visitors": 200, "Active Users": 560 },
    { name: "Apr", Subscribers: 330, "New Visitors": 220, "Active Users": 480 },
    { name: "May", Subscribers: 450, "New Visitors": 260, "Active Users": 550 },
    { name: "Jun", Subscribers: 400, "New Visitors": 290, "Active Users": 580 },
    { name: "Jul", Subscribers: 460, "New Visitors": 320, "Active Users": 620 },
    { name: "Aug", Subscribers: 510, "New Visitors": 340, "Active Users": 680 },
    { name: "Sep", Subscribers: 252, "New Visitors": 360, "Active Users": 740 },
    { name: "Oct", Subscribers: 680, "New Visitors": 390, "Active Users": 820 },
    { name: "Nov", Subscribers: 780, "New Visitors": 420, "Active Users": 890 },
    { name: "Dec", Subscribers: 900, "New Visitors": 450, "Active Users": 980 },
  ];

  // if (!user) {
  //   return <div>Không có người dùng nào đăng nhập.</div>;
  // }
  return (<>
    <div class="container">
      <div class="page-inner">
        <div class="dashboard-container">
          <div class="dashboard-title">
            <h3>Trang chủ</h3>
            <h6>Made by team 25</h6>
          </div>
          <div class="dashboard-actions">
            <a href="#">Manage</a>
            <a href="#">Add Customer</a>
          </div>
        </div>
        <div class="row row-card-no-pd">
          <div class="col-12 col-sm-6 col-md-6 col-xl-3">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div>
                    <h6>
                      <b>Todays Income</b>
                    </h6>
                    <p class="text-muted">All Customs Value</p>
                  </div><h4 class="text-info fw-bold">$170</h4>
                </div>
                <div class="progress progress-sm">
                  <div
                    class="progress-bar bg-info"
                    role="progressbar"
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <div class="d-flex justify-content-between">
                  <p class="text-muted">Change</p>
                  <p class="text-muted">75%</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-md-6 col-xl-3">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div>
                    <h6>
                      <b>Total Revenue</b>
                      
                    </h6>
                    <p class="text-muted">All Customs Value</p>
                  </div><h4 class="text-success fw-bold">$120</h4>
                </div>
                <div class="progress progress-sm">
                  <div
                    class="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: "25%" }}
                  ></div>
                </div>
                <div class="d-flex justify-content-between">
                  <p class="text-muted">Change</p>
                  <p class="text-muted">25%</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-md-6 col-xl-3">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div>
                    <h6>
                      <b>New Orders</b>
                      
                    </h6>
                    <p class="text-muted">Fresh Order Amount</p>
                  </div><h4 class="text-danger fw-bold">15</h4>
                </div>
                <div class="progress progress-sm">
                  <div
                    class="progress-bar bg-danger w-50"
                    role="progressbar"
                    style={{ width: "50%" }}
                  ></div>
                </div>
                <div class="d-flex justify-content-between">
                  <p class="text-muted">Change</p>
                  <p class="text-muted">50%</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-md-6 col-xl-3">
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div>
                    <h6>
                      <b>New Users</b>
                      
                    </h6>
                    <p class="text-muted">Joined New User</p>
                  </div><h4 class="text-secondary fw-bold">12</h4>
                </div>
                <div class="progress progress-sm">
                  <div
                    class="progress-bar bg-secondary"
                    role="progressbar"
                    style={{ width: "25%" }}
                  ></div>
                </div>
                <div class="d-flex justify-content-between">
                  <p class="text-muted">Change</p>
                  <p class="text-muted">25%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row row-card-no-pd">
          <div class="col-md-8">
            <div class="card">
              <div class="card-header">
                <div class="card-head-row">
                  <div class="card-title">User Statistics</div>
                  <div class="card-tools">
                    <a
                      href="#"
                      class="btn btn-label-success btn-round btn-sm me-2"
                    >
                      <span class="btn-label">
                        <i class="fa fa-pencil"></i>
                      </span>
                      Export
                    </a>
                    <a href="#" class="btn btn-label-info btn-round btn-sm">
                      <span class="btn-label">
                        <i class="fa fa-print"></i>
                      </span>
                      Print
                    </a>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="chart-container" style={{ minHeight: "375px" }}>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={data}>
                      <XAxis dataKey="name" />
                      <YAxis type="number" domain={[0, "dataMax"]} />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="New Visitors"
                        stroke="#ffa726"
                        fill="#1e88e5"
                        fillOpacity={0.8}
                      />
                      <Area
                        type="monotone"
                        dataKey="Subscribers"
                        stroke="#ff6b6b"
                        fill="red"
                        fillOpacity={0.6}
                      />
                      <Area
                        type="monotone"
                        dataKey="Active Users"
                        stroke="#2196f3"
                        fill="#0277bd"
                        fillOpacity={0.4}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div id="myChartLegend"></div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card card-primary">
              <div class="card card-primary">
<Sales_daily />

              </div>
            
            </div>
            <div class="card">

              <Useronline />
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-8">
            <div class="card">
              <div class="card-header">
                <div class="card-title">Page visits</div>
              </div>
              <div class="card-body p-0">
                <div class="table-responsive">
                  <table class="table align-items-center">
                    <thead class="thead-light">
                      <tr>
                        <th scope="col">Page name</th>
                        <th scope="col">Visitors</th>
                        <th scope="col">Unique users</th>
                        <th scope="col">Bounce rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">/kaiadmin/</th>
                        <td>4,569</td>
                        <td>340</td>
                        <td>
                          <i class="fas fa-arrow-up text-success me-3"></i>
                          46,53%
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">/kaiadmin/index.html</th>
                        <td>3,985</td>
                        <td>319</td>
                        <td>
                          <i class="fas fa-arrow-down text-warning me-3"></i>
                          46,53%
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">/kaiadmin/charts.html</th>
                        <td>3,513</td>
                        <td>294</td>
                        <td>
                          <i class="fas fa-arrow-down text-warning me-3"></i>
                          36,49%
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">/kaiadmin/tables.html</th>
                        <td>2,050</td>
                        <td>147</td>
                        <td>
                          <i class="fas fa-arrow-up text-success me-3"></i>
                          50,87%
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">/kaiadmin/profile.html</th>
                        <td>1,795</td>
                        <td>190</td>
                        <td>
                          <i class="fas fa-arrow-down text-danger me-3"></i>
                          46,53%
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">/kaiadmin/</th>
                        <td>4,569</td>
                        <td>340</td>
                        <td>
                          <i class="fas fa-arrow-up text-success me-3"></i>
                          46,53%
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">/kaiadmin/index.html</th>
                        <td>3,985</td>
                        <td>319</td>
                        <td>
                          <i class="fas fa-arrow-down text-warning me-3"></i>
                          46,53%
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card">
              <div class="card-header">
                <div class="card-title">Top Products</div>
              </div>
              <div class="card-body pb-0">
                <div class="d-flex ">
                  <div class="avatar">
                    <img
                      src="assets/img/logoproduct.svg"
                      alt="..."
                      class="avatar-img rounded-circle"
                    />
                  </div>
                  <div class="flex-1 pt-1 ms-2">
                    <h6 class="fw-bold mb-1">CSS</h6>
                    <small class="text-muted">Cascading Style Sheets</small>
                  </div>
                  <div class="d-flex ms-auto align-items-center">
                    <h4 class="text-info fw-bold">+$17</h4>
                  </div>
                </div>
                <div class="separator-dashed"></div>
                <div class="d-flex">
                  <div class="avatar">
                    <img
                      src="assets/img/logoproduct.svg"
                      alt="..."
                      class="avatar-img rounded-circle"
                    />
                  </div>
                  <div class="flex-1 pt-1 ms-2">
                    <h6 class="fw-bold mb-1">J.CO Donuts</h6>
                    <small class="text-muted">The Best Donuts</small>
                  </div>
                  <div class="d-flex ms-auto align-items-center">
                    <h4 class="text-info fw-bold">+$300</h4>
                  </div>
                </div>
                <div class="separator-dashed"></div>
                <div class="d-flex">
                  <div class="avatar">
                    <img
                      src="assets/img/logoproduct3.svg"
                      alt="..."
                      class="avatar-img rounded-circle"
                    />
                  </div>
                  <div class="flex-1 pt-1 ms-2">
                    <h6 class="fw-bold mb-1">Ready Pro</h6>
                    <small class="text-muted">
                      Bootstrap 5 Admin Dashboard
                    </small>
                  </div>
                  <div class="d-flex ms-auto align-items-center">
                    <h4 class="text-info fw-bold">+$350</h4>
                  </div>
                </div>
                <div class="separator-dashed"></div>
                <div class="pull-in">
                  <canvas id="topProductsChart"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                <div class="card-head-row card-tools-still-right">
                  <div class="card-title">Recent Activity</div>
                  <div class="card-tools">
                    <div class="dropdown">
                      <button
                        class="btn btn-icon btn-clean"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i class="fas fa-ellipsis-h"></i>
                      </button>
                      <div
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <a class="dropdown-item" href="#">
                          Action
                        </a>
                        <a class="dropdown-item" href="#">
                          Another action
                        </a>
                        <a class="dropdown-item" href="#">
                          Something else here
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <ol class="activity-feed">
                  <li class="feed-item feed-item-secondary">
                    <time class="date" datetime="9-25">
                      Sep 25
                    </time>
                    <span class="text">
                      Responded to need
                      <a href="#">"Volunteer opportunity"</a>
                    </span>
                  </li>
                  <li class="feed-item feed-item-success">
                    <time class="date" datetime="9-24">
                      Sep 24
                    </time>
                    <span class="text">
                      Added an interest
                      <a href="#">"Volunteer Activities"</a>
                    </span>
                  </li>
                  <li class="feed-item feed-item-info">
                    <time class="date" datetime="9-23">
                      Sep 23
                    </time>
                    <span class="text">
                      Joined the group
                      <a href="single-group.php">"Boardsmanship Forum"</a>
                    </span>
                  </li>
                  <li class="feed-item feed-item-warning">
                    <time class="date" datetime="9-21">
                      Sep 21
                    </time>
                    <span class="text">
                      Responded to need
                      <a href="#">"In-Kind Opportunity"</a>
                    </span>
                  </li>
                  <li class="feed-item feed-item-danger">
                    <time class="date" datetime="9-18">
                      Sep 18
                    </time>
                    <span class="text">
                      Created need
                      <a href="#">"Volunteer Opportunity"</a>
                    </span>
                  </li>
                  <li class="feed-item">
                    <time class="date" datetime="9-17">
                      Sep 17
                    </time>
                    <span class="text">
                      Attending the event
                      <a href="single-event.php">"Some New Event"</a>
                    </span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card">
              <div class="card-header">
                <div class="card-head-row">
                  <div class="card-title">Support Tickets</div>
                  <div class="card-tools">
                    <ul
                      class="nav nav-pills nav-secondary nav-pills-no-bd nav-sm"
                      id="pills-tab"
                      role="tablist"
                    >
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          id="pills-today"
                          data-bs-toggle="pill"
                          href="#pills-today"
                          role="tab"
                          aria-selected="true"
                        >
                          Today
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link active"
                          id="pills-week"
                          data-bs-toggle="pill"
                          href="#pills-week"
                          role="tab"
                          aria-selected="false"
                        >
                          Week
                        </a>
                      </li>
                      <li class="nav-item">
                        <a
                          class="nav-link"
                          id="pills-month"
                          data-bs-toggle="pill"
                          href="#pills-month"
                          role="tab"
                          aria-selected="false"
                        >
                          Month
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="card-body">
                <div class="d-flex">
                  <div class="avatar avatar-online">
                    <span class="avatar-title rounded-circle border border-white bg-info">
                      J
                    </span>
                  </div>
                  <div class="flex-1 ms-3 pt-1">
                    <h6 class="text-uppercase fw-bold mb-1">
                      Joko Subianto
                      <span class="text-warning ps-3">pending</span>
                    </h6>
                    <span class="text-muted">
                      I am facing some trouble with my viewport. When i start my
                    </span>
                  </div>
                  <div class="float-end pt-1">
                    <small class="text-muted">8:40 PM</small>
                  </div>
                </div>
                <div class="separator-dashed"></div>
                <div class="d-flex">
                  <div class="avatar avatar-offline">
                    <span class="avatar-title rounded-circle border border-white bg-secondary">
                      P
                    </span>
                  </div>
                  <div class="flex-1 ms-3 pt-1">
                    <h6 class="text-uppercase fw-bold mb-1">
                      Prabowo Widodo
                      <span class="text-success ps-3">open</span>
                    </h6>
                    <span class="text-muted">
                      I have some query regarding the license issue.
                    </span>
                  </div>
                  <div class="float-end pt-1">
                    <small class="text-muted">1 Day Ago</small>
                  </div>
                </div>
                <div class="separator-dashed"></div>
                <div class="d-flex">
                  <div class="avatar avatar-away">
                    <span class="avatar-title rounded-circle border border-white bg-danger">
                      L
                    </span>
                  </div>
                  <div class="flex-1 ms-3 pt-1">
                    <h6 class="text-uppercase fw-bold mb-1">
                      Lee Chong Wei
                      <span class="text-muted ps-3">closed</span>
                    </h6>
                    <span class="text-muted">
                      Is there any update plan for RTL version near future?
                    </span>
                  </div>
                  <div class="float-end pt-1">
                    <small class="text-muted">2 Days Ago</small>
                  </div>
                </div>
                <div class="separator-dashed"></div>
                <div class="d-flex">
                  <div class="avatar avatar-offline">
                    <span class="avatar-title rounded-circle border border-white bg-secondary">
                      P
                    </span>
                  </div>
                  <div class="flex-1 ms-3 pt-1">
                    <h6 class="text-uppercase fw-bold mb-1">
                      Peter Parker
                      <span class="text-success ps-3">open</span>
                    </h6>
                    <span class="text-muted">
                      I have some query regarding the license issue.
                    </span>
                  </div>
                  <div class="float-end pt-1">
                    <small class="text-muted">2 Day Ago</small>
                  </div>
                </div>
                <div class="separator-dashed"></div>
                <div class="d-flex">
                  <div class="avatar avatar-away">
                    <span class="avatar-title rounded-circle border border-white bg-danger">
                      L
                    </span>
                  </div>
                  <div class="flex-1 ms-3 pt-1">
                    <h6 class="text-uppercase fw-bold mb-1">
                      Logan Paul <span class="text-muted ps-3">closed</span>
                    </h6>
                    <span class="text-muted">
                      Is there any update plan for RTL version near future?
                    </span>
                  </div>
                  <div class="float-end pt-1">
                    <small class="text-muted">2 Days Ago</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <footer class="footer">
    <div class="container-fluid d-flex justify-content-between">
      <nav class="pull-left">
        <ul class="nav">
          <li class="nav-item">
            <a class="nav-link" href="#">
              TeaM_25
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"> Help </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#"> Licenses </a>
          </li>
        </ul>
      </nav>
      <div class="copyright">
        2024, made with <i class="fa fa-heart heart text-danger"></i> by team_25
      </div>
      <div>
        Distributed by
        <a target="_blank" href="https://themewagon.com/">team_25</a>.
      </div>
    </div>
  </footer></>
  );
}

export default Home;
